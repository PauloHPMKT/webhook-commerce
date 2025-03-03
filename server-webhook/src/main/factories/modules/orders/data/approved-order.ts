import { ApprovedOrderUseCase } from "../../../../../modules/orders/data/usecases/approved-order";
import { ApprovedOrder } from "../../../../../modules/orders/domain/protocols/usecases/approved-order";
import { OrderRepository } from "../../../../../modules/orders/infra/db/order-repository";

export const makeApprovedOrderUseCase = (): ApprovedOrder => {
  const orderRepository = new OrderRepository();
  const findOrderRepository = orderRepository;
  const updateOrderStatus = orderRepository;
  return new ApprovedOrderUseCase(
    findOrderRepository,
    updateOrderStatus
  );
}
