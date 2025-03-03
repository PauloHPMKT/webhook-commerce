import { CreateOrderController } from "../../../../../modules/orders/presentation/controller/create-order";
import { Controller } from "../../../../../shared/presentation/protocol";
import { makeCreateOrderUseCase } from "../data/create-order";

export const makeCreateOrderController = (): Controller => {
  const createOrderUseCase = makeCreateOrderUseCase();
  return new CreateOrderController(createOrderUseCase);
}
