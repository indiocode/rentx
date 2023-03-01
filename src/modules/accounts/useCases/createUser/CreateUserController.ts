import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';

import CreateUserUseCase from './CreateUserUseCase';

export default class CreateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.body as ICreateUserDTO;

		const createUserUseCase = container.resolve(CreateUserUseCase);

		await createUserUseCase.execute(data);

		return response.status(201).send();
	}
}
