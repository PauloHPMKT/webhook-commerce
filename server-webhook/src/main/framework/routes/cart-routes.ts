import { Router } from "express";
import { expressAdapter } from "../adapters/express-adapter";
import { makeAddToCartController } from "../../factories/modules/cart/presentation/add-to-cart";

export class CartRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    this.router.post('/cart', expressAdapter(makeAddToCartController()));

    return this.router;
  }
}
