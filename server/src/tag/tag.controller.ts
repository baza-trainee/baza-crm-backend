import { Request, Response } from 'express';
import * as tagService from '../tag/tag.service';

export const createTag = async (req: Request, res: Response) => {
    try {
        const tag = await tagService.createTag(req.body.name);
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteTag = async (req: Request, res: Response) => {
    try {
        await tagService.deleteTag(Number(req.params.id));
        res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const editTag = async (req: Request, res: Response) => {
    try {
        const tag = await tagService.editTag(Number(req.params.id), req.body.name);
        res.status(200).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addTagToUser = async (req: Request, res: Response) => {
    try {
        const { userId, tagId } = req.body;
        const user = await tagService.addTagToUser(userId, tagId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
