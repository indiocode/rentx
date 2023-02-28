import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';

import CreateCategoryUseCase from './CreateCategoryUseCase';

export default class CreateCategoryController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.body as ICreateCategoryDTO;

		const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

		await createCategoryUseCase.execute(data);

		return response.status(201).send();
	}
}
