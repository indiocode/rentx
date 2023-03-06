import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';

import '~/shared/container';
import swaggerFile from '~/swagger.json';

import { errorResponse } from './middlewares/errorResponse';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.use(errorResponse);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

export { app };
