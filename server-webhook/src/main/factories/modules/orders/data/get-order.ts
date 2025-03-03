import { GetOrdersUseCase } from "../../../../../modules/orders/data/usecases/get-orders";
import { GetOrders } from "../../../../../modules/orders/domain/protocols/usecases/get-orders";
import { OrderRepository } from "../../../../../modules/orders/infra/db/order-repository";

export const makeGetOrderUseCase = (): GetOrders => {
  const orderRepository = new OrderRepository();
  return new GetOrdersUseCase(orderRepository);
}
