/* eslint-disable no-unused-vars */
import type { Repository } from 'typeorm';

import type { ICreateSpecificationDTO } from '~/modules/cars/dtos/ICreateSpecificationDTO';
import Specification from '~/modules/cars/infra/typeorm/entities/Specification';
import type { ISpecificationsRepository } from '~/modules/cars/repositories/ISpecificationsRepository';
import { AppDataSource } from '~/shared/infra/typeorm';

export default class SpecificationsRepository
	implements ISpecificationsRepository
{
	private repository: Repository<Specification>;

	constructor() {
		this.repository = AppDataSource.getRepository(Specification);
	}

	async create(data: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create(data);

		await this.repository.save(specification);
	}

	async findByName(name: string): Promise<Specification> {
		return (await this.repository.findOneBy({ name })) as Specification;
	}
}
