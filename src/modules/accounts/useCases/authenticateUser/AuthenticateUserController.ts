import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { IAuthenticateUserDto } from '~/modules/accounts/dtos/IAuthenticateUserDto';

import AuthenticateUserUseCase from './AuthenticateUserUseCase';

export default class AuthenticateUserController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.body as IAuthenticateUserDto;

		const authenticateUserCase = container.resolve(AuthenticateUserUseCase);

		const token = await authenticateUserCase.execute(data);

		return response.status(201).json(token);
	}
}
