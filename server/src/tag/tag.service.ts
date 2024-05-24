import { AppDataSource } from '../db/data-source';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (name: string) => {
  const tag = tagRepository.create({ name });
  return await tagRepository.save(tag);
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
