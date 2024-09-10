import { Router } from 'express';
import validator from '../validator/validator';
import tagController from '../tag/tag.controller';
import { getUserJWT } from '../shared/middlewares/getUserJWT';
import {
  createTagSchema,
  editTagSchema,
  tagIdParamSchema,
} from '../tag/tag.schemas';
import { isAdmin } from '../shared/middlewares/isAdmin';

const tagRouter = Router();
tagRouter.use(getUserJWT);

/**
 * @openapi
 * tags:
 *   name: Tag
 *   description: Tag information
 */

/**
 * @openapi
 * /tag/removeTag/{tagId}:
 *   post:
 *     summary: Remove tag from user
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
tagRouter.post(
  '/removeTag/:tagId',
  validator({ params: tagIdParamSchema }),
  tagController.removeTagFromUser,
);

/**
 * @openapi
 * /tag:
 *   get:
 *     summary: get all tags
 *     tags: [Tag]
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
tagRouter.get('/', tagController.getAllTags);

/**
 * @openapi
 * /tag/addTag/{tagId}:
 *   post:
 *     summary: Add tag to user
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
tagRouter.post(
  '/addTag/:tagId',
  validator({ params: tagIdParamSchema }),
  tagController.addTagToUser,
);

tagRouter.use(isAdmin);

/**
 * @openapi
 * /tag/:
 *   post:
 *     summary: Create tag 
 *     tags: [Tag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               color:
 *                 type: string
 *                 required: false
 *               name:
 *                 type: string
 *               isSpecialization:
 *                 type: boolean
 *             example:
 *               color: red
 *               name: Backend
 *               isSpecialization: true
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
tagRouter.post(
  '/',
  validator({ body: createTagSchema }),
  tagController.createTag,
);

/**
 * @openapi
 * /tag/{tagId}:
 *   delete:
 *     summary: Delete tag
 *     tags: [Tag]
 *     parameters:
 *       - in: path
 *         name: tagId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - jwtheader: []
 *     responses:
 *       200:
 *         description: Ok
 */
tagRouter.delete(
  '/:tagId',
  validator({ params: tagIdParamSchema }),
  tagController.deleteTag,
);

// /**
//  * @openapi
//  * /tag/{tagId}:
//  *   patch:
//  *     summary: Update tag
//  *     tags: [Tag]
//  *     parameters:
//  *       - in: path
//  *         name: tagId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               color:
//  *                 type: string
//  *             example:
//  *               color: red
//  *     security:
//  *       - jwtheader: []
//  *     responses:
//  *       200:
//  *         description: Ok
//  */
// tagRouter.patch(
//   '/:tagId',
//   validator({ params: tagIdParamSchema, body: editTagSchema }),
//   tagController.editTag,
// );

export default ['tag', tagRouter];
