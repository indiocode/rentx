/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type Category from '~/modules/cars/entities/Category';

import type CategoriesRepository from '../../repositories/implementations/CategoriesRepository';

@injectable()
export default class ListCategoriesUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: CategoriesRepository,
	) {}

	async execute(): Promise<Category[]> {
		const categories = await this.categoriesRepository.list();
		return categories;
	}
}
