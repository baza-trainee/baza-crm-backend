import { AppDataSource } from '../db/data-source';
import { OtpType } from './otp.types';
import { Otp } from './otp.entity';
import { verifyJWT } from '../jwt/jwt.service';

const otpRepository = AppDataSource.getRepository(Otp);

const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createDiscordLinkOtpCode = async () => {
  const date = new Date();
  date.setHours(date.getHours() + 24);
  const otp = new Otp();
  const code = generateOtpCode();
  otp.code = code;
  otp.expires_at = date;
  otp.otp_type = OtpType.Discord;
  await otpRepository.save(otp);
  return code;
};

export const verifyDiscordLinkOtpCode = async (code: string) => {
  const result = await otpRepository.findOne({
    where: { otp_type: OtpType.Discord, code },
  });
  if (result === null) {
    throw new Error('Code not found');
  }
  if (result.expires_at < new Date()) {
    throw new Error('Code expired');
  }
};

export const deleteOtpCode = async (type: OtpType, code: string) => {
  const result = await otpRepository.delete({ code: code, otp_type: type });
  return Boolean(result.affected);
};
