import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';

import '~/shared/container';
import { createConnection } from '~/shared/infra/typeorm';
import swaggerFile from '~/swagger.json';

import { errorResponse } from './middlewares/errorResponse';
import { router } from './routes';

createConnection({ host: 'localhost' });

const app = express();

app.use(express.json());

app.use(router);

app.use(errorResponse);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(3333, () => console.log('listening on port 3333'));
