/* eslint-disable no-unused-vars */

import { inject, injectable } from 'tsyringe';

import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';
import type Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';
import AppError from '~/shared/errors/AppError';

@injectable()
export default class CreateCarUseCase {
	constructor(
		@inject('CarsRepository')
		private carsRepository: ICarsRepository,
	) {}

	async execute(data: ICreateCarDTO): Promise<Car> {
		const carAlreadyExists = await this.carsRepository.findByLicensePlate(
			data.license_plate,
		);

		if (carAlreadyExists) throw new AppError('Car already exists!');

		return await this.carsRepository.create(data);
	}
}
