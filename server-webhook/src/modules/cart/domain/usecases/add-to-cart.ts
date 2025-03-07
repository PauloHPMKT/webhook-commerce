import { AddToCartModel } from "../models/add-to-cart-model";

export interface AddToCart {
  execute(data: AddToCartModel.Params): Promise<AddToCartModel.Result>;
}
