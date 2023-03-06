import type { Repository } from 'typeorm';

import CarImage from '~/modules/cars/infra/typeorm/entities/CarImage';
import type { ICarsImagesRepository } from '~/modules/cars/repositories/ICarsImagesRepository';
import { AppDataSource } from '~/shared/infra/typeorm';

interface IRequest {
	car_id: string;
	image_name: string;
}

export default class CarsImagesRepository implements ICarsImagesRepository {
	private repository: Repository<CarImage>;

	constructor() {
		this.repository = AppDataSource.getRepository(CarImage);
	}

	async create(data: IRequest): Promise<CarImage> {
		const carImage = this.repository.create(data);

		await this.repository.save(carImage);

		return carImage;
	}
}
