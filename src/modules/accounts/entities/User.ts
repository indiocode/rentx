import { hash } from 'bcrypt';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export default class User {
	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword(): Promise<void> {
		this.password = await hash(this.password, 8);
	}

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar' })
	name: string;

	@Column({ type: 'varchar' })
	email: string;

	@Column({ type: 'varchar' })
	password: string;

	@Column({ type: 'varchar' })
	driver_license: string;

	@Column({ type: 'varchar', nullable: true })
	avatar: string;

	@Column({ type: 'boolean', default: false })
	isAdmin: boolean;

	@CreateDateColumn()
	created_at: Date;
}
