import type { ICreateRentalDTO } from '~/modules/rentals/dtos/ICreateRentalDTO';
import Rental from '~/modules/rentals/infra/typeorm/entities/Rental';
import type { IRentalsRepository } from '~/modules/rentals/repositories/IRentalsRepository';

export default class RentalsRepositoryInMemory implements IRentalsRepository {
	rentals: Rental[] = [];

	async findOpenRentalByCar(car_id: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.car_id === car_id && !rental.end_date,
		) as Rental;
	}

	async findOpenRentalByUser(user_id: string): Promise<Rental> {
		return this.rentals.find(
			(rental) => rental.user_id === user_id && !rental.end_date,
		) as Rental;
	}

	async create(data: ICreateRentalDTO): Promise<Rental> {
		const rental = new Rental();

		Object.assign(rental, {
			...data,
			start_date: new Date(),
		});

		this.rentals.push(rental);

		return rental;
	}

	async findById(id: string): Promise<Rental> {
		return this.rentals.find((rental) => rental.id === id) as Rental;
	}
	async findByUser(user_id: string): Promise<Rental[]> {
		return this.rentals.filter((rental) => rental.user_id === user_id);
	}
}
