/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';
import type { IUsersRepository } from '~/modules/accounts/repositories/IUsersRepository';
import AppError from '~/shared/errors/AppError';

@injectable()
export default class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email,
		);

		if (userAlreadyExists) throw new AppError('User already exists');

		await this.usersRepository.create(data);
	}
}
