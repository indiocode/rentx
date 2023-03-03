import type { Repository } from 'typeorm';

import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';
import type { IFilterCarDTO } from '~/modules/cars/dtos/IFilterCarDTO';
import Car from '~/modules/cars/infra/typeorm/entities/Car';
import type { ICarsRepository } from '~/modules/cars/repositories/ICarsRepository';
import { AppDataSource } from '~/shared/infra/typeorm';

export default class CarsRepository implements ICarsRepository {
	private repository: Repository<Car>;

	constructor() {
		this.repository = AppDataSource.getRepository(Car);
	}

	async create(data: ICreateCarDTO): Promise<Car> {
		const car = this.repository.create(data);
		await this.repository.save(car);
		return car;
	}

	async findByLicensePlate(license_plate: string): Promise<Car> {
		return (await this.repository.findOneBy({ license_plate })) as Car;
	}

	async findAvailable(data: IFilterCarDTO): Promise<Car[]> {
		console.log(data);
		return await this.repository
			.createQueryBuilder('c')
			.where('c.available = :available', { available: true })
			.andWhere(data.brand ? 'c.brand ILIKE :brand' : '1=1', {
				brand: `%${data.brand}%`,
			})
			.andWhere(data.name ? 'c.name ILIKE :name' : '1=1', {
				name: `%${data.name}%`,
			})
			.andWhere(data.category_id ? 'c.category_id = :category_id' : '1=1', {
				category_id: data.category_id,
			})
			.getMany();
	}
}
