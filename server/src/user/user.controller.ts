import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as UserService from './user.service';
import { verifyJWT } from '../jwt/jwt.service';
import { deleteOtpCode, findOtpCode } from '../otp/otp.service';
import { OtpType } from '../otp/otp.types';

const findUserById = async (req: Request, res: Response) => {
  const user = await UserService.findByIdWithTags(Number(req.params.id));

  if (!req.isAdmin()) {
    const {
      city,
      email,
      password,
      phone,
      discord,
      discordReceiving,
      linkedin,
      ...returnUser
    } = user;
    return res.json({ user: returnUser });
  } else return res.json({ user });
};

const updateUser = async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    throw new Error('Empty update object');
  }
  const updatedUser = await UserService.updateUser(req.user.id, req.body);
  return res.json({ updatedUser });
};

const linkDiscord = async (req: Request, res: Response) => {
  const userId = req.getUserId();
  const { data } = req.query;
  const jwtData = verifyJWT(String(data));
  if (typeof jwtData === 'string') {
    throw new Error('Something gone wrong');
  }
  await findOtpCode(jwtData.code, OtpType.Discord);
  await UserService.linkDiscordToUser(userId, jwtData.discordId);
  await deleteOtpCode(jwtData.code, OtpType.Discord);
  return res.json({ status: true });
};

export default {
  findUserById: controllerWrapper(findUserById),
  updateUser: controllerWrapper(updateUser),
  linkDiscord: controllerWrapper(linkDiscord),
};
