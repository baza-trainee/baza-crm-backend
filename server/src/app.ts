import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { notFound } from './shared/not-found';
import { errorHandler } from './error-handlers/error-handler';
import Router from './router';
import { extendFn } from './extends';
import setupSwagger from './swagger';

const app = express();

setupSwagger(app);

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(extendFn);
app.use('/api/v1', Router);

app.use(notFound);
app.use(errorHandler);

export default app;
