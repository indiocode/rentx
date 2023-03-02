import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Category from './Category';

@Entity('cars')
export default class Car {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'varchar' })
	description: string;

	@Column({ type: 'boolean', default: true })
	available: boolean;

	@Column({ type: 'numeric' })
	daily_rate: number;

	@Column({ type: 'varchar' })
	license_plate: string;

	@Column({ type: 'numeric' })
	fine_amount: number;

	@Column({ type: 'varchar' })
	brand: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id' })
	category: Category;

	@Column({ type: 'uuid' })
	category_id: string;

	@CreateDateColumn()
	created_at: Date;
}
