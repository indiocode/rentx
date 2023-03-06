import type { Request, Response } from 'express';
import { container } from 'tsyringe';

import type { IFilterCarDTO } from '~/modules/cars/dtos/IFilterCarDTO';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

export default class ListAvailableCarsController {
	async handle(request: Request, response: Response): Promise<Response> {
		const data = request.query as IFilterCarDTO;

		const listAvailableCarsUseCase = container.resolve(
			ListAvailableCarsUseCase,
		);

		const cars = await listAvailableCarsUseCase.execute(data);

		return response.status(201).json(cars);
	}
}
