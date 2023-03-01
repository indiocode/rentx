/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { ICreateSpecificationDTO } from '~/modules/cars/dtos/ICreateSpecificationDTO';
import type { ISpecificationsRepository } from '~/modules/cars/repositories/ISpecificationsRepository';
import AppError from '~/shared/errors/AppError';

@injectable()
export default class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationsRepository')
		private specificationsRepository: ISpecificationsRepository,
	) {}

	async execute(data: ICreateSpecificationDTO): Promise<void> {
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(data.name);

		if (specificationAlreadyExists)
			throw new AppError('Specification already exists!');

		await this.specificationsRepository.create(data);
	}
}
