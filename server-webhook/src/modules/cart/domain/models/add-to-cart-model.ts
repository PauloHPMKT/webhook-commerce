export namespace AddToCartModel {
  export type Params = {
    customerId: string;
    productId: string;
    quantity: number;
    price: number;
  };

  export type Result = {
    id: string;
    items: CartItem[];
    created_at: Date;
    updated_at: Date | null;
  };

  export type CartItem = {
    productId: string;
    quantity: number;
    price: number;
    totalPrice?: number;
    added_at?: Date;
    updated_at?: Date | null;
  };
}
