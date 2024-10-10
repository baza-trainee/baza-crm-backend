import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as karmaService from './karma.service';
import * as otpService from '../otp/otp.service';
import { verifyJWT } from '../jwt/jwt.service';
import { OtpType } from '../otp/otp.types';

const prepareKarmaReview = async (req: Request, res: Response) => {
  const jwt = verifyJWT(String(req.query.data));
  const userId = req.getUserId();
  if (!jwt.userId || !jwt.code) throw new Error('Wrong jwt token');
  if (userId !== jwt.userId) throw new Error('Wrong user');
  await otpService.findOtpCode(jwt.code, OtpType.Karma);
  const result = await karmaService.sendKarmaUsers(jwt.projectId, userId);
  res.json(result);
};

const setKarma = async (req: Request, res: Response) => {
  const jwt = verifyJWT(String(req.query.data));
  const userId = req.getUserId();
  if (!jwt.userId || !jwt.code) throw new Error('Wrong jwt token');
  if (userId !== jwt.userId) throw new Error('Wrong user');
  await otpService.findOtpCode(jwt.code, OtpType.Karma);
  const result = await karmaService.setKarmas(
    jwt.projectId,
    userId,
    req.body.karmas,
  );
  await otpService.deleteOtpCode(jwt.code, OtpType.Karma);
  res.json({ status: true });
};

export default {
  prepareKarmaReview: controllerWrapper(prepareKarmaReview),
  setKarma: controllerWrapper(setKarma),
};
