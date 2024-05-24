import { Router } from 'express';
import * as tagController from '../tag/tag.controller';

const router = Router();

router.post('/tags', tagController.createTag);
router.delete('/tags/:id', tagController.deleteTag);
router.put('/tags/:id', tagController.editTag);
router.post('/tags/addToUser', tagController.addTagToUser);

export default router;
