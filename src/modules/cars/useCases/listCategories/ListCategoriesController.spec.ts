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

describe('List Categories Controller', () => {
	beforeAll(async () => {
		connection = await createConnection();

		await runSeeder(connection, UserAdminSeeder);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.destroy();
		server.close();
	});

	it('should be able to list all categories', async () => {
		const {
			body: { token },
		} = await request(server).post('/sessions').send({
			email: 'admin@example.com',
			password: 'admin',
		});

		await request(server)
			.post('/categories')
			.send({
				name: 'Category Supertest',
				description: 'Category Supertest',
			})
			.set({
				Authorization: `Bearer ${token}`,
			});

		const { status, body } = await request(server).get('/categories');

		expect(status).toBe(200);
		expect(body.length).toBe(1);
		expect(body[0]).toHaveProperty('id');
		expect(body[0].name).toEqual('Category Supertest');
	});
});
