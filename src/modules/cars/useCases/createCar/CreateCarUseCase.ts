/* eslint-disable no-unused-vars */

import AppError from '~/shared/errors/AppError';

import type { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import type Car from '../../infra/typeorm/entities/Car';
import type { ICarsRepository } from '../../repositories/ICarsRepository';

// @injectable()
export default class CreateCarUseCase {
	constructor(
		// @inject('CarsRepository')
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
