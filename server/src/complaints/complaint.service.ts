import { AppDataSource } from '../db/data-source';
import { Complaints } from './complaint.entity';
import { IComplaint } from './complaint.types';

const complaintsRepository = AppDataSource.getRepository(Complaints);

export const create = async (data:IComplaint) => {
  const complaint = complaintsRepository.create({...data});
  const result = await complaintsRepository.save(complaint);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const getAll = async () => await complaintsRepository.find();

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
      if (result === null) throw new Error(`Something went wrong, maybe ${id} does't exist`);

  return true;
};

// -create(user_id from jwt)
