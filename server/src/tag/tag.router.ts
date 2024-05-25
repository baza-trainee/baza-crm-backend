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
  '/tags',
  validator({ body: createTagSchema }),
  tagController.createTag
);

tagRouter.delete(
  '/tags/:id',
  validator({ params: tagIdParamSchema }),
  tagController.deleteTag
);

tagRouter.put(
  '/tags/:id',
  validator({ params: tagIdParamSchema, body: editTagSchema }),
  tagController.editTag
);

tagRouter.post(
  '/tags/addToUser',
  validator({ body: addTagToUserSchema }),
  tagController.addTagToUser
);

export default ['tag', tagRouter];
