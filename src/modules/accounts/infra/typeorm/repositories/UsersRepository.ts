import type { Repository } from 'typeorm';
import { getRepository } from 'typeorm';

import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';
import User from '~/modules/accounts/infra/typeorm/entities/User';
import type { IUsersRepository } from '~/modules/accounts/repositories/IUsersRepository';

export default class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;

	constructor() {
		this.repository = getRepository(User);
	}

	async findById(id: string): Promise<User> {
		return await this.repository.findOne({ id });
	}

	async create(data: ICreateUserDTO): Promise<void> {
		const user = this.repository.create(data);
		await this.repository.save(user);
	}

	async findByEmail(email: string): Promise<User> {
		return await this.repository.findOne({ email });
	}
}
