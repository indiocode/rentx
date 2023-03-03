import { Router } from 'express';

import CreateCarController from '~/modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '~/modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '~/shared/infra/http/middlewares/ensureAdmin';
import { ensureAthenticated } from '~/shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();

const listAvailableCarsControler = new ListAvailableCarsController();

carsRoutes.post(
	'/',
	ensureAthenticated,
	ensureAdmin,
	createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsControler.handle);

export { carsRoutes };
