import { GetOrdersUseCase } from "../../../data/usecases/get-orders";
import { GetOrders } from "../../../domain/protocols/usecases/get-orders";
import { OrderRepository } from "../../../infra/db/order-repository";

export const makeGetOrdersUseCase = (): GetOrders => {
  const getOrdersRepository = new OrderRepository();
  return new GetOrdersUseCase(getOrdersRepository);
}
