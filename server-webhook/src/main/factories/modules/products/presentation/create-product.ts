import { Controller } from "../../../../../shared/presentation/protocol";
import { CreateProductController } from "../../../../../modules/products/presentation/controller/create-product";
import { makeCreateProductUseCase } from "../data/create-product";

export const makeCreateProductController = (): Controller => {
  const createProductUseCase = makeCreateProductUseCase();
  return new CreateProductController(createProductUseCase);
}
