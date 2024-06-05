import { AppDataSource } from '../db/data-source';
import { OtpType } from './otp.types';
import { Otp } from './otp.entity';
import * as userService from '../user/user.service';

const otpRepository = AppDataSource.getRepository(Otp);

const generateOtpCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const createVerificationCode = async (
  userId: number,
  otpType: OtpType,
): Promise<Otp> => {
  const user = await userService.findById(userId);
  const date = new Date();
  date.setMinutes(date.getMinutes() + 30);

  const otp = new Otp();
  otp.otp_type = otpType;
  otp.code = generateOtpCode();
  otp.expires_at = date;
  otp.user = user;
  const result = await otpRepository.save(otp);
  return result;
};

export const checkedJWT = async (userId: number, code: string) => {
console.log('user',userId, "code", code);
  const otp = await otpRepository.find({
    relations: {
      user: true,
    },
    where: {
      user:{id:userId},
      code,
    },
  });

  console.log(otp);
  if (!otp) return false;

  // await otpRepository.delete(otp.code);
  return true;
};
