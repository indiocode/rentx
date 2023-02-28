import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

export default class UpdateUserAvatarController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id: user_id } = request.user;
		const { filename: avatar_file } = request.file;

		const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

		await updateUserAvatarUseCase.execute({
			avatar_file,
			user_id,
		});
		return response.status(204).send();
	}
}
