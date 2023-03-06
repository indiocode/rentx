/* eslint-disable no-undef */

import CarsRepositoryInMemory from '~/modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import ListAvailableCarsUseCase from './ListAvailableCarsUseCase';

let listAvailableCarUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
	beforeEach(() => {
		carsRepositoryInMemory = new CarsRepositoryInMemory();
		listAvailableCarUseCase = new ListAvailableCarsUseCase(
			carsRepositoryInMemory,
		);
	});

	it('should be able to list all available cars', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car 1',
			description: 'Car 1 description',
			daily_rate: 110.0,
			license_plate: 'SDS-SSD',
			fine_amount: 40,
			brand: 'Car 1 Fox',
			category_id: '864459d7-c86f-4116-bd4d-5dd8c4090778',
		});

		const cars = await listAvailableCarUseCase.execute({});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by brand', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car 2',
			description: 'Car 2 description',
			daily_rate: 110.0,
			license_plate: 'SDS-SSD',
			fine_amount: 40,
			brand: 'Car 2 Fox',
			category_id: '864459d7-c86f-4116-bd4d-5dd8c4090778',
		});

		const cars = await listAvailableCarUseCase.execute({
			brand: 'Car 2 Fox',
		});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by name', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car 2',
			description: 'Car 2 description',
			daily_rate: 110.0,
			license_plate: 'SDS-SSD',
			fine_amount: 40,
			brand: 'Car 2 Fox',
			category_id: '864459d7-c86f-4116-bd4d-5dd8c4090778',
		});

		const cars = await listAvailableCarUseCase.execute({
			name: 'Car 2',
		});

		expect(cars).toEqual([car]);
	});

	it('should be able to list all available cars by category', async () => {
		const car = await carsRepositoryInMemory.create({
			name: 'Car 2',
			description: 'Car 2 description',
			daily_rate: 110.0,
			license_plate: 'SDS-SSD',
			fine_amount: 40,
			brand: 'Car 2 Fox',
			category_id: '864459d7-c86f-4116-bd4d-5dd8c4090778',
		});

		const cars = await listAvailableCarUseCase.execute({
			category_id: '864459d7-c86f-4116-bd4d-5dd8c4090778',
		});

		expect(cars).toEqual([car]);
	});
});
