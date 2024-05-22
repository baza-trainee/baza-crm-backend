import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { notFound } from './middlewares/not-found';
import { errorHandler } from './error-handlers/error-handler';
import Router from './router';
import { getUserJWT } from './shared/getUserJWT';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', Router);

app.use(notFound);
app.use(errorHandler);

export default app;
