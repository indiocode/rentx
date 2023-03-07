/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';
import type Rental from '~/modules/rentals/infra/typeorm/entities/Rental';
import type { IRentalsRepository } from '~/modules/rentals/repositories/IRentalsRepository';
import type { IDateProvider } from '~/shared/container/providers/DateProvider/IDateProvider';
import AppError from '~/shared/errors/AppError';

interface IRequest {
	user_id: string;
	car_id: string;
	expected_return_date: Date;
}

@injectable()
export default class CreateRentalUseCase {
	constructor(
		@inject('RentalsRepository')
		private rentalsRepository: IRentalsRepository,

		@inject('DayjsDateProvider')
		private dateProvider: IDateProvider,

		@inject('CarsRepository')
		private carsRepository: ICarsRepository,
	) {}

	async execute(data: IRequest): Promise<Rental> {
		const minimumHour = 24;

		const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
			data.car_id,
		);

		if (carUnavailable) throw new AppError('Car is unavailable');

		const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
			data.user_id,
		);

		if (rentalOpenToUser)
			throw new AppError("There's a rental in progress for user!");

		const dateNow = this.dateProvider.dateNow();

		const compare = this.dateProvider.compareInHours({
			start_date: dateNow,
			end_date: data.expected_return_date,
		});

		if (compare < minimumHour) {
			throw new AppError('Invalid return time!');
		}

		const rental = await this.rentalsRepository.create(data);

		await this.carsRepository.updateAvailable(data.car_id, false);

		return rental;
	}
}
