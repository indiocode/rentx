import type { Repository } from 'typeorm';
import { getRepository } from 'typeorm';

import Category from '~/modules/cars/entities/Category';

import type { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import type { ICategoriesRepository } from '../ICategoriesRepository';

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
