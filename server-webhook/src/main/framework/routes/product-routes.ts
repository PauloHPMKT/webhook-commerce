import { Router } from 'express';
import { expressAdapter } from '../adapters/express-adapter';
import { makeCreateProductController } from '../../factories/modules/products/presentation/create-product';

export class ProductRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    this.router.post('/product', expressAdapter(makeCreateProductController()));
    return this.router;
  }
}
