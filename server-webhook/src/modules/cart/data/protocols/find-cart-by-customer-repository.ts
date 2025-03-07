import { FindCartModel } from "../../domain/models/find-cart-model";

export interface FindCartByCustomerRepository {
  findById: (customerId: string) => Promise<FindCartModel.Result>
}
