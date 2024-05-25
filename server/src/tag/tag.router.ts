import { Router } from 'express';
import validator from '../validator/validator';
import tagController from '../tag/tag.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import {
  createTagSchema,
  editTagSchema,
  tagIdParamSchema,
  addTagToUserSchema
} from '../tag/tag.schemas';

const tagRouter = Router();
tagRouter.use(getUserJWT);

tagRouter.post(
  '/',
  validator({ body: createTagSchema }),
  tagController.createTag
);

tagRouter.delete(
  '/:id',
  validator({ params: tagIdParamSchema }),
  tagController.deleteTag
);

tagRouter.patch(
  '/:id',
  validator({ params: tagIdParamSchema, body: editTagSchema }),
  tagController.editTag
);

tagRouter.post(
  '/addToUser',
  validator({ body: addTagToUserSchema }),
  tagController.addTagToUser
);

tagRouter.get(
  '/',
  tagController.getAllTags
);

export default ['tags', tagRouter];
