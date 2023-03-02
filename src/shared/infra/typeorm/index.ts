import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';
import type { SeederOptions } from 'typeorm-extension';

import MainSeeder from './seeds/MainSeeder';

const options: DataSourceOptions & SeederOptions = {
	synchronize: true,
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'docker',
	password: 'rentx_db',
	database: 'rentx_db',
	migrations: ['./src/shared/infra/typeorm/migrations/*.{js,ts}'],
	entities: ['./src/modules/**/infra/typeorm/entities/*.{js,ts}'],
	seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
