import { OrderEntity } from "../../domain/entities/Order";

export interface GetOrdersRepository {
  getOrders: () => Promise<OrderEntity[]>;
}
