import { AppDataSource } from '../db/data-source';
import { Tag } from '../tag/tag.entity';
import { User } from '../user/user.entity';
import * as userService from '../user/user.service';
import { ICreateTag, IUpdateTag } from './tag.types';

const tagRepository = AppDataSource.getRepository(Tag);
const userRepository = AppDataSource.getRepository(User);

export const findTagById = async (id: number) => {
  const tag = await tagRepository.findOne({ where: { id } });
  if (tag === null) throw new Error('Tag not found');
  return tag;
};

export const findTagByName = async (name:string)=>{
  const tag = await tagRepository.findOne({ where: { name } });
  if (tag === null) throw new Error('Tag not found');
  return tag;
}

export const createTag = async (dto: ICreateTag) => {
  if(dto.isSpecialization && !dto.color) throw new Error('Specialization must have a color')
  const tag = await tagRepository.create(dto);
  const result = await tagRepository.save(tag);

  return result;
};

export const deleteTag = async (id: number) => {
  const result = await tagRepository.delete(id);
  if (!result.affected) {
    throw new Error('Something wrong, try again');
  }
  return true;
};

export const editTag = async (id: number, updateDto: IUpdateTag) => {
  const tag = await findTagById(id);
  await tagRepository.update(tag, updateDto);
  return await findTagById(id);
};

export const addTagToUser = async (userId: number, tagId: number) => {
  const user = await userService.findByIdWithTags(userId);

  const tag = await findTagById(tagId);

  if (tag.isSpecialization) {
    if (user.specializations.find((el) => el.id === tag.id)) {
      throw new Error('Tag already added');
    } else {
      user.specializations.push(tag);
    }
  } else {
    if (user.technologies.find((el) => el.id === tag.id)) {
      throw new Error('Tag already added');
    } else {
      user.technologies.push(tag);
    }
  }
  return await userRepository.save(user);
};

export const removeTagFromUser = async (userId: number, tagId: number) => {
  const user = await userService.findByIdWithTags(userId);

  const tag = await findTagById(tagId);

  if (tag.isSpecialization) {
    if (user.specializations.find((el) => el.id === tag.id)) {
      user.specializations = user.specializations.filter(
        (el) => el.id !== tagId,
      );
    } else {
      throw new Error('User dont have this tag');
    }
  } else {
    if (user.technologies.find((el) => el.id === tag.id)) {
      user.technologies = user.technologies.filter((el) => el.id !== tagId);
    } else {
      throw new Error('User dont have this tag');
    }
  }
  return await userRepository.save(user);
};

export const getAllTags = async () => {
  return await tagRepository.find();
};
