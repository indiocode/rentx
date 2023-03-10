/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import ImportCategoryUseCase from './ImportCategoryUseCase';

export default class ImportCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { file } = request;
		const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
		await importCategoryUseCase.execute(file as Express.Multer.File);

		return response.status(201).send();
	}
}
