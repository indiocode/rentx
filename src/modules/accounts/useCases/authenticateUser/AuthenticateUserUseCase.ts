/* eslint-disable no-unused-vars */
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import type { IAuthenticateUserDto } from '~/modules/accounts/dtos/IAuthenticateUserDto';
import type { IUsersRepository } from '~/modules/accounts/repositories/IUsersRepository';
import AppError from '~/shared/errors/AppError';

const SECRET_KEY: string = '45187df8371c96e7355d309a935650e86c7e1f6e';

interface IResponse {
	user: {
		email: string;
		name: string;
	};
	token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute(data: IAuthenticateUserDto): Promise<IResponse> {
		const user = await this.usersRepository.findByEmail(data.email);

		if (!user) throw new AppError('E-mail or password incorrect!');

		const passwordMatch = await compare(data.password, user.password);

		if (!passwordMatch) throw new AppError('E-mail or password incorrect!');

		const token = sign({} as any, SECRET_KEY, {
			subject: user.id,
			expiresIn: '1d',
		});

		return {
			user: {
				email: user.email,
				name: user.name,
			},
			token,
		};
	}
}
