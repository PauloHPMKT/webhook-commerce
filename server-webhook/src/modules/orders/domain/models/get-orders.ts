import { OrderEntity } from "../entities/Order";

export namespace GetOrdersModel {
  export type Response = OrderEntity[];
}
