import { OrderRoutes } from "./orders-routes";
import { ProductRoutes } from "./product-routes";

export class RoutesFactory {
  static createRoutes() {
    const orderRoutes = new OrderRoutes();
    const productRoutes = new ProductRoutes();

    return {
      orderRoutes: orderRoutes.getRouter(),
      productRoutes: productRoutes.getRouter(),
    };
  }
}
