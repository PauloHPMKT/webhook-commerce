import { Cart } from "../entities/Cart";

export namespace FindCartModel {
  export type Params = {
    id?: string;
    userId: string;
  };

  export type Result = Cart
}
