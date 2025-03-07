import { AddToCartModel } from "../../domain/models/add-to-cart-model";

export interface AddToCartRepository {
  add(data: AddToCartModel.Params): Promise<AddToCartModel.Result>;
}
