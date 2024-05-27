import { Router } from 'express';
import validator from '../validator/validator';
import tagController from '../tag/tag.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import {
  createTagSchema,
  editTagSchema,
  tagIdParamSchema,
} from '../tag/tag.schemas';

const tagRouter = Router();
tagRouter.use(getUserJWT);

tagRouter.post(
  '/',
  validator({ body: createTagSchema }),
  tagController.createTag
);

tagRouter.delete(
  '/:tagId',
  validator({ params: tagIdParamSchema }),
  tagController.deleteTag
);

tagRouter.patch(
  '/:tagId',
  validator({ params: tagIdParamSchema, body: editTagSchema }),
  tagController.editTag
);

tagRouter.post(
  '/addTag/:tagId',
  validator({ params: tagIdParamSchema }),
  tagController.addTagToUser
);

tagRouter.get(
  '/',
  tagController.getAllTags
);

export default ['tag', tagRouter];
