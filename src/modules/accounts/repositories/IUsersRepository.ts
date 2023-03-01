/* eslint-disable no-unused-vars */

import type { ICreateUserDTO } from '~/modules/accounts/dtos/ICreateUserDto';
import type User from '~/modules/accounts/infra/typeorm/entities/User';

export interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}
