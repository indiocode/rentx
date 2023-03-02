import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';

import CreateCarUseCase from './CreateCarUseCase';

export default class CreateCarController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.body as ICreateCarDTO;

		const createCarUseCase = container.resolve(CreateCarUseCase);

		const car = await createCarUseCase.execute(data);

		return response.status(201).json(car);
	}
}
