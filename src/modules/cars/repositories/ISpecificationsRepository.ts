/* eslint-disable no-unused-vars */
import type { ICreateSpecificationDTO } from '~/modules/cars/dtos/ICreateSpecificationDTO';
import type Specification from '~/modules/cars/infra/typeorm/entities/Specification';

export interface ISpecificationsRepository {
	create(data: ICreateSpecificationDTO): Promise<void>;
	findByName(name: string): Promise<Specification>;
}
