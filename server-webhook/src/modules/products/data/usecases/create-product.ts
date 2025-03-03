import { Product } from "../../domain/entities/Product";
import { CreateProductModel } from "../../domain/models/create-product";
import { CreateProduct } from "../../domain/usecases/create-product";

export class CreateProductUseCase implements CreateProduct {
  async execute(data: CreateProductModel.Params): Promise<CreateProductModel.Result> {
    const product = new Product({
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
    });

    return product;
  }
}
