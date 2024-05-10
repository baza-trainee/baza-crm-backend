import { AppDataSource } from '../db/data-source';
import { User } from './user.entity';
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

export const findById = async (userId: number) => {
  const result = await userRepository.findOneBy({ id: userId });
  if (result === null) throw new Error('User not found');
  return result;
};

export const findWithPassword = async (email: string) => {
  const result = await userRepository.findUserWithPassword(email);
  if (result === null) throw new Error('User not found');
  return result;
};
