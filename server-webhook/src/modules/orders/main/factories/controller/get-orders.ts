import { GetOrdersController } from "../../../presentation/controller/get-orders";
import { Controller } from "../../../presentation/protocol/controller";
import { makeGetOrdersUseCase } from "../data/get-orders";

export const makeGetOrdersController = (): Controller => {
  const getOrdersUseCase = makeGetOrdersUseCase();
  return new GetOrdersController(getOrdersUseCase);
}
