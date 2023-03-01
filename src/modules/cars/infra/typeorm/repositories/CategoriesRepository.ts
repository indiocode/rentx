import type { Repository } from 'typeorm';
import { getRepository } from 'typeorm';

import type { ICreateCategoryDTO } from '~/modules/cars/dtos/ICreateCategoryDTO';
import Category from '~/modules/cars/infra/typeorm/entities/Category';
import type { ICategoriesRepository } from '~/modules/cars/repositories/ICategoriesRepository';

export default class CategoriesRepository implements ICategoriesRepository {
	private repository: Repository<Category>;

	constructor() {
		this.repository = getRepository(Category);
	}

	async create(data: ICreateCategoryDTO): Promise<void> {
		const category = this.repository.create(data);

		await this.repository.save(category);
	}

	async list(): Promise<Category[]> {
		return await this.repository.find();
	}

	async findByName(name: string): Promise<Category> {
		return await this.repository.findOne({ name });
	}
}
