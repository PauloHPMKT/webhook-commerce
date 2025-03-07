import { Cart } from "../entities/Cart";

export namespace CreateCartModel {
  export type Params = Cart;
  export type Result = {
    id: string;
    items: Cart.CartItem[];
    user_id: string;
  }
}
