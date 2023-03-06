/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';
import type { ISpecificationsRepository } from '~/modules/cars/repositories/ISpecificationsRepository';
import AppError from '~/shared/errors/AppError';

interface IRequest {
	car_id: string;
	specifications_id: string[];
}

@injectable()
export default class CreateCarSpecificationUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository,

		@inject('SpecificationsRepository')
		private specificationsRepository: ISpecificationsRepository,
	) {}

	async execute(data: IRequest): Promise<Car> {
		const carExists = await this.carsRepository.findById(data.car_id);

		if (!carExists) {
			throw new AppError('Car does not exists!');
		}

		const specifications = await this.specificationsRepository.findByIds(
			data.specifications_id,
		);

		return await this.carsRepository.create({ ...carExists, specifications });
	}
}
