/* eslint-disable no-unused-vars */
import type CarImage from '~/modules/cars/infra/typeorm/entities/CarImage';

interface IRequest {
	car_id: string;
	image_name: string;
}
export interface ICarsImagesRepository {
	create(data: IRequest): Promise<CarImage>;
}
