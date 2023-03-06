import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

import { env } from '~/env';

import MainSeeder from './seeds/MainSeeder';

export const baseOptions: DataSourceOptions & SeederOptions = {
	synchronize: true,
	type: env.NODE_ENV === 'test' ? 'better-sqlite3' : 'postgres',
	database: env.DATABASE_NAME,
	migrations: ['./src/shared/infra/typeorm/migrations/*.{js,ts}'],
	entities: ['./src/modules/**/infra/typeorm/entities/*.{js,ts}'],
	seeds: [MainSeeder],
};

const options =
	env.NODE_ENV === 'test'
		? baseOptions
		: {
				...baseOptions,
				host: env.DATABASE_HOST,
				port: env.DATABASE_PORT,
				username: env.DATABASE_USER,
				password: env.DATABASE_PASSWORD,
		  };

export const AppDataSource = new DataSource(options);

export const createConnection = async (): Promise<DataSource> =>
	await AppDataSource.initialize();
