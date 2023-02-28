/* eslint-disable no-unused-vars */
import type { Repository } from 'typeorm';
import { getRepository } from 'typeorm';

import Specification from '~/modules/cars/entities/Specification';

import type { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import type { ISpecificationsRepository } from '../ISpecificationsRepository';

export default class SpecificationsRepository
	implements ISpecificationsRepository
{
	private repository: Repository<Specification>;

	constructor() {
		this.repository = getRepository(Specification);
	}

	async create(data: ICreateSpecificationDTO): Promise<void> {
		const specification = this.repository.create(data);

		await this.repository.save(specification);
	}

	async findByName(name: string): Promise<Specification> {
		return await this.repository.findOne({ name });
	}
}
