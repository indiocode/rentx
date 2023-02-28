/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import AppError from '~/errors/AppError';

import type { ICreateUserDTO } from '../../dtos/ICreateUserDto';
import type UsersRepository from '../../repositories/implementations/UsersRepository';

@injectable()
export default class CreateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: UsersRepository,
	) {}

	async execute(data: ICreateUserDTO): Promise<void> {
		const userAlreadyExists = await this.usersRepository.findByEmail(
			data.email,
		);

		if (userAlreadyExists) throw new AppError('User already exists');

		await this.usersRepository.create(data);
	}
}
