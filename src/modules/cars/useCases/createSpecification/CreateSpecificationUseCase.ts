/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import AppError from '~/errors/AppError';

import type { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import type SpecificationsRepository from '../../repositories/implementations/SpecificationsRepository';

@injectable()
export default class CreateSpecificationUseCase {
	constructor(
		@inject('SpecificationsRepository')
		private specificationsRepository: SpecificationsRepository,
	) {}

	async execute(data: ICreateSpecificationDTO): Promise<void> {
		const specificationAlreadyExists =
			await this.specificationsRepository.findByName(data.name);

		if (specificationAlreadyExists)
			throw new AppError('Specification already exists!');

		await this.specificationsRepository.create(data);
	}
}
