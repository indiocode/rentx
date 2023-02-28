/* eslint-disable no-unused-vars */
import type Specification from '~/modules/cars/entities/Specification';

import type { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';

export interface ISpecificationsRepository {
	create(data: ICreateSpecificationDTO): Promise<void>;
	findByName(name: string): Promise<Specification>;
}
