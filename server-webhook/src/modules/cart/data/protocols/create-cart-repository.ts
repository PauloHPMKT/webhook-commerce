import { CreateCartModel } from "../../domain/models/create-cart.model";

export interface CreateCartRepository {
  create(cart: CreateCartModel.Params): Promise<CreateCartModel.Result>;
}
