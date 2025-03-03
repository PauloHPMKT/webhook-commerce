import { Order, OrderEntity } from "../../domain/entities/Order";
import { ApprovedOrder } from "../../domain/protocols/usecases/approved-order";
import { FindOrderRepository } from "../protocol/find-order";
import { UpdateOrderStatusRepository } from "../protocol/update-order-status";

export class ApprovedOrderUseCase implements ApprovedOrder {
  constructor(
    private readonly findOrder: FindOrderRepository,
    private readonly updateOrderStatus: UpdateOrderStatusRepository,
  ) {}

  async execute(data: any): Promise<OrderEntity> {
    const order = await this.findOrder.find(data.transactionId);
    if (!order) {
      throw new Error("Pedido não encontrado");
    }

    const updatedOrder = new OrderEntity({
      ...order,
      status: data.status === 'approved' && Order.Status.PAID,
      updated_at: new Date(),
    });

    const saveUpdate = await this.updateOrderStatus.update(updatedOrder);
    if (!saveUpdate) {
      throw new Error("Erro ao atualizar status do pedido");
    }

    return saveUpdate;
  }
}
