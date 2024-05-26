import { AppDataSource } from '../db/data-source';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import * as userService  from '../user/user.service';

const tagRepository = AppDataSource.getRepository(Tag);

export const createTag = async (name: string, color: string) => {
  const newTag = new Tag();
  newTag.name = name;
  newTag.color = color;

  const result = await tagRepository.save(newTag);

  if (result === null) throw new Error('Something went wrong');
  return result;
};

export const deleteTag = async (id: number) => {
  return await tagRepository.delete(id);
};

export const editTag = async (id: number, newName: string, newColor: string) => {
  const tag = await tagRepository.findOneBy({ id });
  if (!tag) throw new Error('Tag not found');
  tag.name = newName;
  tag.color = newColor;
  return await tagRepository.save(tag);
};

export const addTagToUser = async (userId: number, tagId: number) => {
  const user = await userService.findByIdWithTags(userId);
  if (!user) throw new Error('User not found');
 
  const tag = await tagRepository.findOneBy({ id: tagId });
  if (!tag) throw new Error('Tag not found');

  user.tags.push(tag);
  return await AppDataSource.getRepository(User).save(user);
};

export const getAllTags = async () => {
  return await tagRepository.find();
};