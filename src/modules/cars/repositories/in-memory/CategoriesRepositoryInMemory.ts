import type { ICreateCategoryDTO } from '~/modules/cars/dtos/ICreateCategoryDTO';
import Category from '~/modules/cars/infra/typeorm/entities/Category';
import type { ICategoriesRepository } from '~/modules/cars/repositories/ICategoriesRepository';

export default class CategoriesRepositoryInMemory
	implements ICategoriesRepository
{
	categories: Category[] = [];

	async findByName(name: string): Promise<Category> {
		return this.categories.find((caregory) => caregory.name === name);
	}

	async list(): Promise<Category[]> {
		return this.categories;
	}

	async create(data: ICreateCategoryDTO): Promise<void> {
		const category = new Category();

		Object.assign(category, data);

		this.categories.push(category);
	}
}
