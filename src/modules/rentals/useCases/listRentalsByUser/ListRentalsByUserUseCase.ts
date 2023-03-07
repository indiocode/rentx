/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type Rental from '../../infra/typeorm/entities/Rental';
import type { IRentalsRepository } from '../../repositories/IRentalsRepository';

@injectable()
export default class ListRentalsByUserUseCase {
	constructor(
		@inject('RentalsRepository')
		private rentalsRepository: IRentalsRepository,
	) {}

	async execute(user_id: string): Promise<Rental[]> {
		return await this.rentalsRepository.findByUser(user_id);
	}
}
