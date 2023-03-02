/* eslint-disable no-unused-vars */
import { randomUUID } from 'crypto';
import type { DataSource } from 'typeorm';
import type { Seeder, SeederFactoryManager } from 'typeorm-extension';

import User from '~/modules/accounts/infra/typeorm/entities/User';

export default class UserAdminSeeder implements Seeder {
	async run(
		dataSource: DataSource,
		factoryManager: SeederFactoryManager,
	): Promise<void> {
		const repository = dataSource.getRepository(User);

		const user = repository.create({
			id: randomUUID(),
			name: 'admin',
			email: 'admin@example.com',
			password: 'admin',
			isAdmin: true,
		});

		await repository.save(user);
	}
}
