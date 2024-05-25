import { Request, Response } from 'express';
import * as tagService from '../tag/tag.service';
import controllerWrapper from '../decorators/controller-wrapper';

const createTag = async (req: Request, res: Response) => {
  const tag = await tagService.createTag(req.body.name);
  res.status(201).json(tag);
};

const deleteTag = async (req: Request, res: Response) => {
  await tagService.deleteTag(Number(req.params.id));
  res.json({ message: 'Tag deleted successfully' });
};

const editTag = async (req: Request, res: Response) => {
  const tag = await tagService.editTag(Number(req.params.id), req.body.name);
  res.json(tag);
};

const addTagToUser = async (req: Request, res: Response) => {
  const { userId, tagId } = req.body;
  const user = await tagService.addTagToUser(userId, tagId);
  res.json(user);
};

export default {
  createTag: controllerWrapper(createTag),
  deleteTag: controllerWrapper(deleteTag),
  editTag: controllerWrapper(editTag),
  addTagToUser: controllerWrapper(addTagToUser),
};
