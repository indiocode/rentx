import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

export class CreateCarImages1677967604034 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'cars_image',
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
						name: 'image_name',
						type: 'varchar',
					},
					{
						name: 'created_at',
						type: 'date',
						default: 'now()',
					},
				],
				foreignKeys: [
					{
						name: 'FKCarImage',
						referencedTableName: 'cars',
						referencedColumnNames: ['id'],
						columnNames: ['car_id'],
						onDelete: 'SET NULL',
						onUpdate: 'SET NULL',
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('cars_image');
	}
}
