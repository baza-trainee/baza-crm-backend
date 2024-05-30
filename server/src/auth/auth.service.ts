import bcrypt from 'bcrypt';
import * as userServices from '../user/user.service';
import { signJWT } from '../jwt/jwt.service';

const { SALT } = process.env;
if (SALT === undefined) throw new Error();

export const userRegistration = async (email: string, password: string) => {
  await userServices.existByEmail(email);
  const hashPassword = await bcrypt.hash(password, Number(SALT));
  const data = { email, password: hashPassword };
  const newUser = await userServices.createUser(data);
  /*   
  1. ОТР.service.createVerificstionCode (userId: number) 
    1.1 ОТР.service сегенерировать код
    1.2 записать код с юзером в базу

  2. Сделать jwt токен из createVerificstionCode
  3. Создать ссылку для отпавки на почту и прокинуть ссылку в майл сервис sendVerificationEmail
  4. Сделать Route  который будет обрабатывать (в auth)
  
  */

  return newUser;
};

export const userLogin = async (email: string, password: string) => {
  const user = await userServices.findWithPassword(email);

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Error('Email or password is wrong');
  }

  const payload = {
    id: user.id,
    // status: true/false
  };

  const token = signJWT(payload, '23h');

  const data = {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
  return data;
};

export const getMe = async (id: number) => {
  return await userServices.findByIdWithTags(id);
};
