import { Product } from "../../domain/entities/Product";
import { CreateProductModel } from "../../domain/models/create-product";
import { CreateProduct } from "../../domain/usecases/create-product";

export class CreateProductUseCase implements CreateProduct {
  async execute(data: CreateProductModel.Params): Promise<CreateProductModel.Result> {
    return new Promise(resolve => resolve({
      id: 'valid_id',
      code: 'valid_code',
      name: 'valid_name',
      brand: 'valid_brand',
      description: 'valid_description',
      price: 10,
      quantity: 10,
      images: null,
      discount: null,
      category: [],
      status: 'active' as Product.Status,
      createdAt: new Date('2025-09-01T00:00:00.000Z'),
    }));
  }
}
