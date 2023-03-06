/* eslint-disable no-unused-vars */
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
			name: 'admin',
			email: 'admin@example.com',
			password: 'admin',
			isAdmin: true,
		});

		// const userAlreadyExists: User = repository.findOneBy({
		// 	email: user.email,
		// }) as unknown as User;

		// if (userAlreadyExists) throw new Error('User already exists');

		await repository.save(user);
	}
}
