import { env } from '~/env';

import { createConnection } from '../typeorm';

import { app } from './app';

createConnection();

export const server = app.listen(env.PORT, () =>
	console.log(`listening on port ${env.PORT}`),
);
