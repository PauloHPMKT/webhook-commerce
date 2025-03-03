import { GetOrdersController } from "../../../../../modules/orders/presentation/controller/get-orders";
import { Controller } from "../../../../../shared/presentation/protocol";
import { makeGetOrderUseCase } from "../data/get-order";

export const makeGetOrdersController = (): Controller => {
  const getOrderUseCase = makeGetOrderUseCase();
  return new GetOrdersController(getOrderUseCase);
}
