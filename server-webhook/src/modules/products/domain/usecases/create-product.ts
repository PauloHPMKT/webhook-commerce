import { CreateProductModel } from "../models/create-product";

export interface CreateProduct {
  execute(
    data: CreateProductModel.Params
  ): Promise<CreateProductModel.Result>;
}
