import bcrypt from 'bcrypt';
import * as userServices from '../user/user.service';
import { signJWT } from '../jwt/jwt.service';

const { SALT } = process.env;
if (SALT === undefined) throw new Error();

export const userRegistration = async (email: string, password: string) => {
  await userServices.existByEmail(email);
  const hashPassword = await bcrypt.hash(password, SALT);
  const data = { email, password: hashPassword };
  const newUser = await userServices.createUser(data);

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
