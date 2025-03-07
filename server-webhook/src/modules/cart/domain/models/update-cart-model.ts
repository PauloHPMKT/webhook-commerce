import { Cart } from "../entities/Cart";

export namespace UpdateCartModel {
  export type Params = {
    id: string;
    userId: string;
    items: CartItem[];
    created_at?: Date;
    updated_at?: Date | null;
  };

  export type CartItem = {
    productId: string;
    quantity: number;
  };

  export type Result = {
    id: string;
    userId: string;
    items: CartItem[];
    created_at: Date;
    updated_at: Date | null;
  };
}
