import { AppDataSource } from '../db/data-source';
import { Otp, OtpType } from './otp.entity';
import { Repository, MoreThan } from 'typeorm';

const otpRepository: Repository<Otp> = AppDataSource.getRepository(Otp);

const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createVerificstionCode = async (
  userId: number,
  otpType: OtpType,
): Promise<Otp> => {
  const otp = new Otp();
  otp.userId = userId;
  otp.otp_type = otpType;
  otp.code = generateOtpCode();
  otp.expires_at = new Date(Date.now() + 30 * 60 * 1000);

  return await otpRepository.save(otp);
};

export const verifyOtp = async (
  userId: number,
  otp_type: OtpType,
  code: string,
): Promise<boolean> => {
  const otp = await otpRepository.findOne({
    where: {
      userId,
      otp_type,
      code,
      expires_at: MoreThan(new Date()),
    },
  });

  if (!otp) return false;

  await otpRepository.delete(otp.id);
  return true;
};
