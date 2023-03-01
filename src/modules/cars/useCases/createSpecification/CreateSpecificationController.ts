/* eslint-disable no-unused-vars */
import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { ICreateSpecificationDTO } from '~/modules/cars/dtos/ICreateSpecificationDTO';

import CreateSpecificationUseCase from './CreateSpecificationUseCase';

export default class CreateSpecificationController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.body as ICreateSpecificationDTO;

		const createSpecificationUseCase = container.resolve(
			CreateSpecificationUseCase,
		);

		await createSpecificationUseCase.execute(data);

		return response.status(201).send();
	}
}
