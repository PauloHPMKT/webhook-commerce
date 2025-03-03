import { OrderRoutes } from "./orders-routes";

export class RoutesFactory {
  static createRoutes() {
    const orderRoutes = new OrderRoutes();

    return {
      orderRoutes: orderRoutes.getRouter(),
    };
  }
}
