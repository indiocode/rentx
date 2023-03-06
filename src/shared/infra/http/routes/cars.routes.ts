import { Router } from 'express';
import multer from 'multer';

import upload from '~/config/upload';
import CreateCarController from '~/modules/cars/useCases/createCar/CreateCarController';
import CreateCarSpecificationController from '~/modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import ListAvailableCarsController from '~/modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import UploadCarImagesController from '~/modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureAdmin } from '~/shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '~/shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const uploadCarsImages = multer(upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsControler = new ListAvailableCarsController();
const createCarsSpecificationController =
	new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
	'/',
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsControler.handle);

carsRoutes.post(
	'/specifications/:id',
	ensureAuthenticated,
	ensureAdmin,
	createCarsSpecificationController.handle,
);

carsRoutes.post(
	'/images/:id',
	ensureAuthenticated,
	ensureAdmin,
	uploadCarsImages.array('images'),
	uploadCarImagesController.handle,
);

export { carsRoutes };
