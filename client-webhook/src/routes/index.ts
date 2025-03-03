import { Router } from 'express';
import { registerPaymentController } from '../controller/register-payment.controller';

const routes = Router();

routes.post('/register', registerPaymentController);

export default routes;