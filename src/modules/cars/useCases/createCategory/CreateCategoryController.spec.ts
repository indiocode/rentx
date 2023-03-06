/* eslint-disable no-undef */
import request from 'supertest';
import type { DataSource } from 'typeorm';
import { runSeeder } from 'typeorm-extension';

import { env } from '~/env';
import { app } from '~/shared/infra/http/app';
import { createConnection } from '~/shared/infra/typeorm';
import UserAdminSeeder from '~/shared/infra/typeorm/seeds/UserAdminSeeder';

let connection: DataSource;

let server = app.listen(env.PORT);

describe('Create Category Controller', () => {
	beforeAll(async () => {
		connection = await createConnection();

		await runSeeder(connection, UserAdminSeeder);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
		server.close();
	});

	it('should be able to create a new category ', async () => {
		const { body } = await request(server).post('/sessions').send({
			email: 'admin@example.com',
			password: 'admin',
		});

		const { status } = await request(server)
			.post('/categories')
			.send({
				name: 'Category Supertest',
				description: 'Category Supertest',
			})
			.set({
				Authorization: `Bearer ${body.token}`,
			});

		expect(status).toBe(201);
	});

	it('should not be able to create a new category with name exists', async () => {
		const { body } = await request(server).post('/sessions').send({
			email: 'admin@example.com',
			password: 'admin',
		});

		const response = await request(server)
			.post('/categories')
			.send({
				name: 'Category Supertest',
				description: 'Category Supertest',
			})
			.set({
				Authorization: `Bearer ${body.token}`,
			});

		expect(response.status).toBe(400);
	});
});
