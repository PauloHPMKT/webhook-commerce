import { Cart } from "../entities/Cart";

export namespace AddToCartModel {
  export type Params = {
    customerId: string;
    productId: string;
    quantity: number;
  };
  export type Result = {
    id: string;
    items: { productId: string, quantity: number }[];
    created_at: Date;
    updated_at: Date | null;
  };
}
