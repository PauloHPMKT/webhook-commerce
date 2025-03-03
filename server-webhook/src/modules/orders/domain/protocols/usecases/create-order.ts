import { CreateOrderDTO } from "../../../data/models/create-order";
import { OrderEntity } from "../../entities/Order";

export interface CreateOrder {
  execute(data: CreateOrderDTO): Promise<OrderEntity>;
}
