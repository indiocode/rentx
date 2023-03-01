import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';

import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';
import User from '~/modules/accounts/infra/typeorm/entities/User';
import type { IUsersRepository } from '~/modules/accounts/repositories/IUsersRepository';

export default class UsersRepositoryInMemory implements IUsersRepository {
	users: User[] = [];

	async create(data: ICreateUserDTO): Promise<void> {
		const user = new User();

		Object.assign(user, {
			...data,
			id: randomUUID(),
			isAdmin: false,
			created_at: new Date(),
			password: await hash(data.password, 8),
		});

		this.users.push(user);
	}

	async findByEmail(email: string): Promise<User> {
		return this.users.find((user) => user.email === email);
	}

	async findById(id: string): Promise<User> {
		return this.users.find((user) => user.id === id);
	}
}
