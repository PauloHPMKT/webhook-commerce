import { Product } from "../entities/Product";

export namespace CreateProductModel {
  export type Params = {
    name: string;
    brand: string;
    description: string;
    price: number;
    quantity: number;
  };

  export type Result = Omit<
    Product,
    'checkProductName' |
    'checkPrice'
  >;
}
