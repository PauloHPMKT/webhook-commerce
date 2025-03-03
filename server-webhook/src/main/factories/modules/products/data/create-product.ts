import { CreateProductUseCase } from "../../../../../modules/products/data/usecases/create-product";
import { CreateProduct } from "../../../../../modules/products/domain/usecases/create-product";

export const makeCreateProductUseCase = (): CreateProduct => {
  return new CreateProductUseCase();
}
