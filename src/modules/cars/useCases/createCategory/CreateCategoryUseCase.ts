/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import AppError from '~/errors/AppError';
import type CategoriesRepository from '~/modules/cars/repositories/implementations/CategoriesRepository';

import type { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';

@injectable()
export default class CreateCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: CategoriesRepository,
	) {}

	async execute(data: ICreateCategoryDTO): Promise<void> {
		const categoryAlreadyExists = await this.categoriesRepository.findByName(
			data.name,
		);

		if (categoryAlreadyExists) {
			throw new AppError('Category Already exists!');
		}

		this.categoriesRepository.create(data);
	}
}
