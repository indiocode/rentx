import type { Repository } from 'typeorm';
import { IsNull } from 'typeorm';

import type { ICreateRentalDTO } from '~/modules/rentals/dtos/ICreateRentalDTO';
import Rental from '~/modules/rentals/infra/typeorm/entities/Rental';
import type { IRentalsRepository } from '~/modules/rentals/repositories/IRentalsRepository';
import { AppDataSource } from '~/shared/infra/typeorm';

export default class RentalsRepository implements IRentalsRepository {
	private repository: Repository<Rental>;

	constructor() {
		this.repository = AppDataSource.getRepository(Rental);
	}

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		return (await this.repository.findOneBy({
			car_id,
			end_date: IsNull(),
		})) as Rental;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		return (await this.repository.findOneBy({
			user_id,
			end_date: IsNull(),
		})) as Rental;
	}

	async create(data: ICreateRentalDTO): Promise<Rental> {
		const rental = this.repository.create(data);

		await this.repository.save(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		return (await this.repository.findOneBy({ id })) as Rental;
	}

	async findByUser(user_id: string): Promise<Rental[]> {
		const rentals = await this.repository.find({
			where: { user_id },
			relations: ['car'],
		});

		return rentals;
	}
}
