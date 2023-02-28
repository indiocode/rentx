/* eslint-disable no-unused-vars */
import type Category from '~/modules/cars/entities/Category';

import type { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';

export interface ICategoriesRepository {
	findByName(name: string): Promise<Category>;
	list(): Promise<Category[]>;
	create(data: ICreateCategoryDTO): Promise<void>;
}
