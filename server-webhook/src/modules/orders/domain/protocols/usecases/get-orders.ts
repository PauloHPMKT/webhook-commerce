import { OrderEntity } from "../../entities/Order";

export interface GetOrders {
  execute(): Promise<OrderEntity[]>;
}
