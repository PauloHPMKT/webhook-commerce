import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeCreateOrderController } from '../../factories/controller/create-order-factory';
import { makeGetOrdersController } from '../../factories/controller/get-orders';
import { makeApprovedOrderController } from '../../factories/controller/approved-order';

export class OrderRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    this.router.post('/create-order', expressAdapter(makeCreateOrderController()));
    this.router.get('/orders', expressAdapter(makeGetOrdersController()));
    // essa rota terá que ser privada
    this.router.post('/notification/approved', expressAdapter(makeApprovedOrderController()));

    return this.router;
  }
}
