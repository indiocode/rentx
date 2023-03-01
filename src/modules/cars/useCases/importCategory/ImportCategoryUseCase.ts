/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { parse as csvParse } from 'csv-parse';
import { createReadStream, promises } from 'fs';
import { inject, injectable } from 'tsyringe';

import type { ICategoriesRepository } from '~/modules/cars/repositories/ICategoriesRepository';

interface IImportCategory {
	name: string;
	description: string;
}

@injectable()
export default class ImportCategoryUseCase {
	constructor(
		@inject('CategoriesRepository')
		private categoriesRepository: ICategoriesRepository,
	) {}

	loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
		return new Promise((resolve, reject) => {
			const categories: IImportCategory[] = [];

			const stream = createReadStream(file.path);

			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on('data', async (line) => {
					const [name, description] = line;

					categories.push({ name, description });
				})
				.on('end', () => {
					promises.unlink(file.path);
					resolve(categories);
				})
				.on('error', (error) => reject(error));
		});
	}

	async execute(file: Express.Multer.File): Promise<void> {
		const categories = await this.loadCategories(file);

		categories.map(async (category) => {
			const existCategory = await this.categoriesRepository.findByName(
				category.name,
			);

			if (!existCategory) await this.categoriesRepository.create(category);
		});
	}
}
