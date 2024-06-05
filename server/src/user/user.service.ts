import { AppDataSource } from '../db/data-source';
import { User } from './user.entity';
import { IUserRegister, IUpdateUser } from './user.types';

const userRepository = AppDataSource.getRepository(User).extend({
  findUserWithPassword(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .addSelect('user.password')
      .getOne();
  },
});

export const createUser = async (data: IUserRegister) => {
  const { email, password } = data;

  const newUser = new User();
  newUser.email = email;
  newUser.password = password;

  const result = await userRepository.save(newUser);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const findById = async (userId: number) => {
  const result = await userRepository.findOneBy({ id: userId });
  if (result === null) throw new Error('User not found');
  return result;
};

export const findByEmail = async (email: string) => {
  const result = await userRepository.findOneBy({ email });
  if (result === null) throw new Error('User not found');
  return result;
};

export const existByEmail = async (email: string) => {
  const result = await userRepository.findOneBy({ email });
  if (result) throw new Error('Email in use');
};

export const findWithPassword = async (email: string) => {
  const result = await userRepository.findUserWithPassword(email);
  if (result === null) throw new Error('User not found');
  return result;
};

// TODO rewrite to 2 methods one internal one external with only tags id
export const findByIdWithTags = async (userId: number) => {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ['technologies', 'specializations'],
  });

  if (!user) throw new Error('User not found');
  return user;
};

export const updateUser = async (
  userId: number,
  dataUpd: Partial<IUpdateUser>,
) => {
  await userRepository.update(userId, dataUpd);
  const updatedUser = await findById(userId);
  return updatedUser;
};

export const linkDiscordToUser = async (userId: number, discordId: string) => {
  const user = await findById(userId);
  if (user.discord) {
    throw new Error('Discord already linked');
  }
  user.discord = discordId;
  await userRepository.save(user);
};
