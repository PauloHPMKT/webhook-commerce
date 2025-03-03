import { Product } from "../../domain/entities/Product";
import { CreateProductModel } from "../../domain/models/create-product";
import { CreateProduct } from "../../domain/usecases/create-product";
import { CreateProductRepository } from "../protocols/create-product-repository";

export class CreateProductUseCase implements CreateProduct {
  constructor(private readonly createProductRepository: CreateProductRepository) {}

  async execute(data: CreateProductModel.Params): Promise<CreateProductModel.Result> {
    const newProduct = new Product({
      name: data.name,
      brand: data.brand,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      images: data.images,
      discount: data.discount,
      category: data.category,
    });

    const product = await this.createProductRepository.create(newProduct);
    return product;
  }
}
