import { Router } from "express";
import { expressAdapter } from "../adapters/express-adapter";
import { makeSignUpCustomerController } from "../../factories/modules/customer/presentation/signup-customer";

export class CustomerRoutes {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  public getRouter() {
    this.router.post('/signup', expressAdapter(makeSignUpCustomerController()));

    return this.router;
  }
}
