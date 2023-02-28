/* eslint-disable no-unused-vars */

import type { ICreateUserDTO } from '../dtos/ICreateUserDto';
import type User from '../entities/User';

export interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByEmail(email: string): Promise<User>;
	findById(id: string): Promise<User>;
}
