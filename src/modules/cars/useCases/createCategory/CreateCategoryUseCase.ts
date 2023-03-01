/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { ICreateCategoryDTO } from '~/modules/cars/dtos/ICreateCategoryDTO';
import type { ICategoriesRepository } from '~/modules/cars/repositories/ICategoriesRepository';
import AppError from '~/shared/errors/AppError';

@injectable()
export default class CreateCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
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
