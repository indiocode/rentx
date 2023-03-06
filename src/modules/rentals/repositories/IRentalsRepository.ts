/* eslint-disable no-unused-vars */
import type { ICreateRentalDTO } from '~/modules/rentals/dtos/ICreateRentalDTO';
import type Rental from '~/modules/rentals/infra/typeorm/entities/Rental';

export interface IRentalsRepository {
	findOpenRentalByCar(car_id: string): Promise<Rental>;
	findOpenRentalByUser(user_id: string): Promise<Rental>;
	create(data: ICreateRentalDTO): Promise<Rental>;
	findById(id: string): Promise<Rental>;
	findByUser(user_id: string): Promise<Rental[]>;
}
