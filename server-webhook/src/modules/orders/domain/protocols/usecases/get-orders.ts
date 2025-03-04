import { OrderEntity } from "../../entities/Order";
import { GetOrdersModel } from "../../models/get-orders";

export interface GetOrders {
  execute(): Promise<GetOrdersModel.Response>;
}
