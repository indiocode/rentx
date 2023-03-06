/* eslint-disable no-unused-vars */
import { inject, injectable } from 'tsyringe';

import type { ICarsImagesRepository } from '~/modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
	car_id: string;
	images_name: string[];
}

@injectable()
export default class UploadCarImagesUseCase {
	constructor(
		@inject('CarsImagesRepository')
		private carsImagesRepository: ICarsImagesRepository,
	) {}

	async execute(data: IRequest): Promise<void> {
		data.images_name.map(async (image_name) => {
			await this.carsImagesRepository.create({
				car_id: data.car_id,
				image_name,
			});
		});
	}
}
