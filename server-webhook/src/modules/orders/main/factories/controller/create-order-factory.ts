import { CreateOrderController } from "../../../presentation/controller/create-order";
import { Controller } from "../../../presentation/protocol/controller";
import { makeCreateOrderUseCase } from "../data/create-order.factory";

export const makeCreateOrderController = (): Controller => {
  const createOrderUseCase = makeCreateOrderUseCase();
  return new CreateOrderController(createOrderUseCase);
}
