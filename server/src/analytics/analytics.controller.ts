import { Request, Response } from 'express';
import controllerWrapper from '../decorators/controller-wrapper';
import * as AnalyticsService from './analytics.service';

const getUserAnalytics = async (req: Request, res: Response) => {
  const { body } = req;
  const result = await AnalyticsService.getUserAnalytics(body);
  res.json({ count: result[1], data: result[0] });
};

const getProjectAnalytics = async (req: Request, res: Response) => {
  const { body } = req;
  const result = await AnalyticsService.getProjectAnalytics(body);
  res.json({ count: result[1], data: result[0] });
};

export default {
  getUserAnalytics: controllerWrapper(getUserAnalytics),
  getProjectAnalytics: controllerWrapper(getProjectAnalytics),
};
