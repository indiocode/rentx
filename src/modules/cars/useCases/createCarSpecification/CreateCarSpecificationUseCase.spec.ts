/* eslint-disable no-undef */

import CarsRepositoryInMemory from '~/modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import SpecificationsRepositoryInMemory from '~/modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import AppError from '~/shared/errors/AppError';

import CreateCarSpecificationUseCase from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
		createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
			carsRepositoryInMemory,
			specificationsRepositoryInMemory,
		);
	});

	it('should not be able to add a new specification to a now-existent car', async () => {
		await expect(async () => {
			const car_id = '233';
			const specifications_id = ['423423'];

			await createCarSpecificationUseCase.execute({
				car_id,
				specifications_id,
			});
		}).rejects.toBeInstanceOf(AppError);
	});

	it('should be able to add a new specification to the car', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Name Car 2',
			description: 'Description Car',
			daily_rate: 100,
			license_plate: 'ABC-1234',
			fine_amount: 60,
			brand: 'Brand',
			category_id: 'category',
		});

		const specification = await specificationsRepositoryInMemory.create({
			description: 'Test',
			name: 'Test',
		});

		const specificationsCars = await createCarSpecificationUseCase.execute({
			car_id: car.id,
			specifications_id: [specification.id],
		});

		expect(specificationsCars).toHaveProperty('specifications');
		expect(specificationsCars.specifications.length).toBe(1);
	});
});
