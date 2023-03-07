import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class CreateRentals1677969829749 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'rentals',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						default: 'uuid_generate_v4()',
					},
					{
						name: 'car_id',
						type: 'uuid',
					},
					{
						name: 'user_id',
						type: 'uuid',
					},
					{
						name: 'start_date',
						type: 'date',
						default: 'now()',
					},

					{
						name: 'end_date',
						type: 'date',
						isNullable: true,
					},
					{
						name: 'expected_return_date',
						type: 'date',
					},
					{
						name: 'total',
						type: 'numeric',
						isNullable: true,
					},
					{
						name: 'created_at',
						type: 'date',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: '',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKCarRental',
						referencedTableName: 'cars',
						referencedColumnNames: ['id'],
						columnNames: ['car_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
					{
						name: 'FKUserRental',
						referencedTableName: 'users',
						referencedColumnNames: ['id'],
						columnNames: ['user_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('rentals');
	}
}
