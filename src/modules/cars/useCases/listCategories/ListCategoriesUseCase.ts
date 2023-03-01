/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type Category from '~/modules/cars/infra/typeorm/entities/Category';
import type { ICategoriesRepository } from '~/modules/cars/repositories/ICategoriesRepository';

@injectable()
export default class ListCategoriesUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	async execute(): Promise<Category[]> {
		const categories = await this.categoriesRepository.list();
		return categories;
	}
}
