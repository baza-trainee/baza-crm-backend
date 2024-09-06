import bcrypt from 'bcrypt';
import * as userServices from '../user/user.service';
import * as tagService from '../tag/tag.service'
import * as userRequestService from '../user-request/user-request.service';
import { signJWT } from '../jwt/jwt.service';
import getConfigValue from '../config/config';

const SALT = getConfigValue('SALT');

export const userRegistration = async (email: string, password: string) => {
  await userServices.existByEmail(email);
  const userRequest = await userRequestService.getByEmail(email);
  if (!userRequest.isAccepted) {
    throw new Error('Your request is not approved');
  }
  const hashPassword = await bcrypt.hash(password, SALT);
  const data = { email, password: hashPassword };
  const newUser = await userServices.createUser(data, userRequest);
  try {
    const tag = await tagService.findTagByName(userRequest.specialization)
    await tagService.addTagToUser(newUser.id,tag.id)
  } catch (error) {
      console.log(error)
  }
  return newUser;
};

export const userLogin = async (email: string, password: string) => {
  const user = await userServices.findWithPassword(email);

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new Error('Email or password is wrong');
  }

  const payload: any = {
    id: user.id,
  };

  if (user.id === 1) {
    payload.isAdmin = true;
  }
  if (user.discord) {
    payload.discordLinked = true;
  }

  const token = signJWT(payload, '24h');

  const data: any = {
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  };
  if (user.id === 1) {
    data.user.isAdmin = true;
  }
  return data;
};

export const getMe = async (id: number) => {
  return await userServices.findByIdWithTags(id);
};
