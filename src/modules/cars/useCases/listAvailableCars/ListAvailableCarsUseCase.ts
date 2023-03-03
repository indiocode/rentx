/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { IFilterCarDTO } from '~/modules/cars/dtos/IFilterCarDTO';
import type Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';

@injectable()
export default class ListAvailableCarsUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository,
	) {}

	async execute(data: IFilterCarDTO): Promise<Car[]> {
		return await this.carsRepository.findAvailable(data);
	}
}
