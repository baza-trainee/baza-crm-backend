import { AppDataSource } from '../db/data-source';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (name: string) => {
  const newTag = new Tag();
  newTag.name = name;

  const result = await tagRepository.save(newTag);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const deleteTag = async (id: number) => {
  return await tagRepository.delete(id);
};

export const editTag = async (id: number, newName: string) => {
  const tag = await tagRepository.findOneBy({ id });
  if (!tag) throw new Error('Tag not found');
  tag.name = newName;
  return await tagRepository.save(tag);
};

export const addTagToUser = async (userId: number, tagId: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { id: userId }, relations: ['tags'] });
  const tag = await tagRepository.findOneBy({ id: tagId });

  if (!user || !tag) throw new Error('User or Tag not found');

  user.tags.push(tag);
  return await userRepository.save(user);
};

export const findByIdWithTags = async (userId: number) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ['tags'],
  });

  if (!user) throw new Error('User not found');
  
  return user;
};

export const getAllTags = async () => {
  return await tagRepository.find();
};