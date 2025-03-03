import { OrderEntity } from "../../domain/entities/Order";
import { GetOrders } from "../../domain/protocols/usecases/get-orders";
import { GetOrdersRepository } from "../protocol/get-orders";

export class GetOrdersUseCase implements GetOrders {
  constructor(private readonly getOrdersRepository: GetOrdersRepository) {}

  async execute(): Promise<OrderEntity[]> {
    const orders = await this.getOrdersRepository.getOrders();
    if (!orders.length) {
      return [];
    }
    return orders;
  }
}
