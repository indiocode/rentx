/* eslint-disable no-unused-vars */
import type { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import type Car from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
	create(data: ICreateCarDTO): Promise<Car>;
	findByLicensePlate(license_plate: string): Promise<Car>;
}
