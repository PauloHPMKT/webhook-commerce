import { CreateProductUseCase } from "../../../../../modules/products/data/usecases/create-product";
import { CreateProduct } from "../../../../../modules/products/domain/usecases/create-product";
import { MongoProductRepository } from "../../../../../modules/products/infra/db/mongodb/mongo-product-repository";

export const makeCreateProductUseCase = (): CreateProduct => {
  const createProductRepository = new MongoProductRepository();
  return new CreateProductUseCase(createProductRepository);
}
