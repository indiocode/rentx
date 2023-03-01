/* eslint-disable no-unused-vars */
import type { ICreateCategoryDTO } from '~/modules/cars/dtos/ICreateCategoryDTO';
import type Category from '~/modules/cars/infra/typeorm/entities/Category';

export interface ICategoriesRepository {
	findByName(name: string): Promise<Category>;
	list(): Promise<Category[]>;
	create(data: ICreateCategoryDTO): Promise<void>;
}
