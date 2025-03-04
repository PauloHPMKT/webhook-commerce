import { CartRoutes } from "./cart-routes";
import { CustomerRoutes } from "./customer-routes";
import { OrderRoutes } from "./orders-routes";
import { ProductRoutes } from "./product-routes";

export class RoutesFactory {
  static createRoutes() {
    const orderRoutes = new OrderRoutes();
    const productRoutes = new ProductRoutes();
    const cartRoutes = new CartRoutes();
    const customerRoutes = new CustomerRoutes();

    return {
      orderRoutes: orderRoutes.getRouter(),
      productRoutes: productRoutes.getRouter(),
      cartRoutes: cartRoutes.getRouter(),
      customerRoutes: customerRoutes.getRouter(),
    };
  }
}
