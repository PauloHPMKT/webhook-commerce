import { Product } from "../entities/Product";

export namespace CreateProductModel {
  export type Repository = Omit<
    Product,
    'checkProductName' |
    'checkPrice'
  >;

  export type Status = Product.Status;
};
