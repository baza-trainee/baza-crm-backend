import { AppDataSource } from '../db/data-source';
import { User } from './user.entity';
const userRepository = AppDataSource.getRepository(User);

export const findById = async (userId: number) => {
  const result = await userRepository.findOneBy({ id: userId });
  if (result === null) throw new Error('User not found');
  return result;
};
