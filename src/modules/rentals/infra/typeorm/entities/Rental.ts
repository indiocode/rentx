import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import Car from '~/modules/cars/infra/typeorm/entities/Car';

@Entity('rentals')
export default class Rental {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@ManyToOne(() => Car)
	@JoinColumn({ name: 'car_id' })
	car: Car;

	@Column({ type: 'varchar' })
	car_id: string;

	@Column({ type: 'varchar' })
	user_id: string;

	@Column({ type: 'date', default: () => 'now()' })
	start_date: Date;

	@Column({ type: 'date', nullable: true })
	end_date: Date;

	@Column({ type: 'date' })
	expected_return_date: Date;

	@Column({ type: 'numeric', nullable: true })
	total: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
