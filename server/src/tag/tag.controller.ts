import { Request, Response } from 'express';
import * as tagService from '../tag/tag.service';
import controllerWrapper from '../decorators/controller-wrapper';

const createTag = async (req: Request, res: Response) => {
  const tag = await tagService.createTag(req.body);
  res.status(201).json(tag);
};

const deleteTag = async (req: Request, res: Response) => {
  await tagService.deleteTag(Number(req.params.tagId));
  res.json({ message: 'Tag deleted successfully' });
};

const editTag = async (req: Request, res: Response) => {
  if (!Object.keys(req.body).length) {
    throw new Error('Empty update object');
  }
  const tag = await tagService.editTag(Number(req.params.tagId), req.body);
  res.json(tag);
};

const addTagToUser = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { tagId } = req.params;
  const user = await tagService.addTagToUser(userId, Number(tagId));
  res.json(user);
};

const getAllTags = async (req: Request, res: Response) => {
  const tags = await tagService.getAllTags();
  res.json(tags);
};

export default {
  createTag: controllerWrapper(createTag),
  deleteTag: controllerWrapper(deleteTag),
  editTag: controllerWrapper(editTag),
  addTagToUser: controllerWrapper(addTagToUser),
  getAllTags: controllerWrapper(getAllTags),
};
