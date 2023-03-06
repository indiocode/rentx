import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

import Category from './Category';
import Specification from './Specification';

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

	@ManyToMany(() => Specification)
	@JoinTable({
		name: 'specifications_cars',
		joinColumns: [{ name: 'car_id' }],
		inverseJoinColumns: [{ name: 'specification_id' }],
	})
	specifications: Specification[];

	@CreateDateColumn()
	created_at: Date;
}
