import { randomUUID } from 'crypto';

import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';
import Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';

export default class CarsRepositoryInMemory implements ICarsRepository {
	cars: Car[] = [];

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = new Car();

		Object.assign(car, {
			...data,
			id: randomUUID(),
			available: true,
			created_at: new Date(),
		});

		this.cars.push(car);

		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return await this.cars.find((car) => car.license_plate === license_plate);
	}
}
