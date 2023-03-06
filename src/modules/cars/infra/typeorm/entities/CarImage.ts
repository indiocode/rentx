import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cars_image')
export default class CarImage {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	car_id: string;

	@Column({ type: 'varchar' })
	image_name: string;

	@CreateDateColumn()
	created_at: Date;
}
