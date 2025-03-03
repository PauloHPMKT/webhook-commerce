import { Product } from "../../domain/entities/Product";
import { CreateProductModel } from "../../domain/models/create-product";

export interface CreateProductRepository {
  create: (data: Product) => Promise<CreateProductModel.Result>;
}
