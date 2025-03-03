import { ApprovedOrderUseCase } from "../../../data/usecases/approved-order";
import { ApprovedOrder } from "../../../domain/protocols/usecases/approved-order";
import { OrderRepository } from "../../../infra/db/order-repository";

export const makeApprovedOrderUseCase = (): ApprovedOrder => {
  const orderRepository = new OrderRepository();
  const updateOrderStatus = orderRepository;
  const findOrder = orderRepository;
  return new ApprovedOrderUseCase(updateOrderStatus, findOrder);
}
