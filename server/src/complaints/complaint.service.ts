import { AppDataSource } from '../db/data-source';
import { Complaint } from './complaint.entity';
import { IComplaint } from './complaint.types';
import * as userService from '../user/user.service';

const complaintsRepository = AppDataSource.getRepository(Complaint);

export const create = async (data: IComplaint, userId: number) => {
  const user = await userService.findById(userId);
  const complaint = complaintsRepository.create({ ...data });
  complaint.user = user;
  const result = await complaintsRepository.save(complaint);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const getAll = async () => {
  const result = await complaintsRepository.find({
    select: { id: true, title: true, isChecked: true },
  });
  return result;
};

export const getById = async (id: number) => {
  const result = await complaintsRepository.findOneBy({ id });
  if (result === null) throw new Error('Not found');
  return result;
};

export const setChecked = async (id: number, value: boolean) => {
  const complaint = await getById(id);
  complaint.isChecked = value;
  const result = await complaintsRepository.save(complaint);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const deleteItem = async (id: number) => {
  const result = await complaintsRepository.delete(id);

  if (!result.affected)
    throw new Error(`Something went wrong, maybe ${id} does't exist`);

  return true;
};
