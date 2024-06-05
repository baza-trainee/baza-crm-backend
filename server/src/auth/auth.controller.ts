import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as authService from './auth.service';
import * as otpService from '../otp/otp.service';
import * as userServices from '../user/user.service';
import { OtpType } from '../otp/otp.types';
import { signJWT, verifyJWT } from '../jwt/jwt.service';
import { sendVerificationEmail } from '../mail/mail.service';
import { JwtPayload } from 'jsonwebtoken';

const { BASE_URL } = process.env;

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const newUser = await authService.userRegistration(email, password);
  const result = await otpService.createVerificationCode(
    newUser.id,
    OtpType.Verification,
  );

  const { code } = result;
  const payload = {
    userId: newUser.id,
    code,
  };
  const token = signJWT(payload, '30m');

  const link = `${BASE_URL}/api/v1/auth/verify?verifyToken=${token}`;

  await sendVerificationEmail(email, link);
  res.status(201).json('Registration successful, please verify your email.');
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.userLogin(email, password);

  res.json(user);
};

const getMe = async (req: Request, res: Response) => {
  const { id } = req.user;
  const user = await authService.getMe(id);
  return res.json(user);
};

const handlerVerify = async (req: Request, res: Response) => {
  const { verifyToken } = req.query;
  if (!verifyToken) {
    return;
  }

  const data = verifyJWT(String(verifyToken));
  const { userId, code } = data as JwtPayload;
console.log(userId);
  const user = await userServices.findById(userId);

  const result = await otpService.checkedJWT(userId, code);

  user.isVerified = result;

  res.json(user);
};

export default {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getMe: controllerWrapper(getMe),
  handlerVerify: controllerWrapper(handlerVerify),
};
