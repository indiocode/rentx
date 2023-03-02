import type { Repository } from 'typeorm';
import { getRepository } from 'typeorm';

import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';
import Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';

export default class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = getRepository(Car);
	}

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create(data);
		await this.repository.save(car);
		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return await this.repository.findOne({ license_plate });
	}
}
