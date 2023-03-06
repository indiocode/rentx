/* eslint-disable no-undef */
import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';
import UsersRepositoryInMemory from '~/modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import CreateUserUseCase from '~/modules/accounts/useCases/createUser/CreateUserUseCase';
import AppError from '~/shared/errors/AppError';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
	beforeEach(() => {
		usersRepositoryInMemory = new UsersRepositoryInMemory();

		authenticateUserUseCase = new AuthenticateUserUseCase(
			usersRepositoryInMemory,
		);

		createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
	});

	it('should be able to authenticate an user', async () => {
		const user: ICreateUserDTO = {
			driver_license: '3X4MPL3',
			email: 'user@example.com',
			name: 'John Smith',
			password: '12345678',
		};

		await createUserUseCase.execute(user);

		const userAuthenticated = await authenticateUserUseCase.execute({
			email: user.email,
			password: user.password,
		});

		expect(userAuthenticated).toHaveProperty('token');
	});

	it('should not be able to authenticate an nonexistent user', async () => {
		await expect(async () => {
			await authenticateUserUseCase.execute({
				email: 'example@mail.com',
				password: '12345678',
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to authenticate with incorrect password', async () => {
		await expect(async () => {
			const user: ICreateUserDTO = {
				driver_license: '3X4MPL3',
				email: 'user@example.com',
				name: 'John Smith',
				password: '12345678',
			};

			await createUserUseCase.execute(user);

			await authenticateUserUseCase.execute({
				email: user.email,
				password: 'incorrect_password',
			});
		}).rejects.toBeInstanceOf(AppError);
	});
});
