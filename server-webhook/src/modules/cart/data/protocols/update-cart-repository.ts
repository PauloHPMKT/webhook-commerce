import { UpdateCartModel } from "../../domain/models/update-cart-model";

export interface UpdateCartRepository {
  update: (cart: UpdateCartModel.Params) => Promise<UpdateCartModel.Result>
}
