import type { ICreateSpecificationDTO } from '~/modules/cars/dtos/ICreateSpecificationDTO';
import Specification from '~/modules/cars/infra/typeorm/entities/Specification';
import type { ISpecificationsRepository } from '~/modules/cars/repositories/ISpecificationsRepository';

export default class SpecificationsRepositoryInMemory
	implements ISpecificationsRepository
{
	async create(data: ICreateSpecificationDTO): Promise<Specification> {
		const specification = new Specification();

		Object.assign(specification, data);

		this.specifications.push(specification);

		return specification;
	}
	specifications: Specification[] = [];

	async findByName(name: string): Promise<Specification> {
		return this.specifications.find(
			(specification) => specification.name === name,
		) as Specification;
	}
	async findByIds(ids: string[]): Promise<Specification[]> {
		return this.specifications.filter((specification) =>
			ids.includes(specification.id),
		);
	}
}
