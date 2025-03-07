import { FindCustomerModel } from "../../domain/models/customer-model";

export interface FindCustomerAndUpdateCartRepository {
  findCustomerAndUpdateCart: (customerId: string, cartId: string) => Promise<FindCustomerModel.Result>;
}
