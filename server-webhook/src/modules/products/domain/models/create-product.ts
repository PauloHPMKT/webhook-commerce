import { Product } from "../entities/Product";

export namespace CreateProductModel {
  export type Params = {
    name: string;
    brand: string;
    description: string;
    price: number;
    quantity: number;
    images?: null,
    discount?: null,
    category?: string[],
    status?: Product.Status,
  };

  export type Result = Omit<
    Product,
    'checkProductName' |
    'checkPrice'
  >;
}
