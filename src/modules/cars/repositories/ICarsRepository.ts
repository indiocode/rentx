/* eslint-disable no-unused-vars */
import type { ICreateCarDTO } from '~/modules/cars/dtos/ICreateCarDTO';
import type { IFilterCarDTO } from '~/modules/cars/dtos/IFilterCarDTO';
import type Car from '~/modules/cars/infra/typeorm/entities/Car';

export interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
	findAvailable(data: IFilterCarDTO): Promise<Car[]>;
	findById(id: string): Promise<Car>;
	updateAvailable(id: string, available: boolean): Promise<void>;
}
