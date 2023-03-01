/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { IUsersRepository } from '~/modules/accounts/repositories/IUsersRepository';
import { deleteFile } from '~/utils/file';

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
export default class UpdateUserAvatarUseCase {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,
	) {}

	async execute(data: IRequest): Promise<void> {
		const user = await this.usersRepository.findById(data.user_id);

		if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

		await this.usersRepository.create({ ...user, avatar: data.avatar_file });
	}
}
