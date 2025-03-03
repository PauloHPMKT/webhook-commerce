import { Product } from "../../domain/entities/Product";
import { CreateProductModel } from "../../domain/models/create-product";
import { CreateProductRepository } from "../protocols/create-product-repository";
import { CreateProductUseCase } from "./create-product";

const makeCreateProductRepository = (): CreateProductRepository => {
  class CreateProductRepositoryStub implements CreateProductRepository {
    async create(data: Product): Promise<CreateProductModel.Result> {
      return {
        id: data.id,
        code: data.code,
        name: data.name,
        brand: data.brand,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
        images: data.images,
        discount: data.discount,
        category: data.category,
        status: data.status,
        createdAt: data.createdAt,
      };
    }
  }
  return new CreateProductRepositoryStub();
}

const makeSut = (): SutTypes => {
  const createProductRepository = makeCreateProductRepository();
  const sut = new CreateProductUseCase(createProductRepository);
  return {
    sut,
    createProductRepository,
  };
}

interface SutTypes {
  sut: CreateProductUseCase;
  createProductRepository: CreateProductRepository;
}

describe('CreateProductUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should throw an error if name is less than 3 characters', async () => {
    const { sut } = makeSut();
    const productData: CreateProductModel.Params = {
      name: 'Pr',
      brand: 'any_brand',
      description: 'any_description',
      price: 10,
      quantity: 10,
    };
    const promise = sut.execute(productData);
    await expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow('name is not valid for a product');
  });

  it('should throw an error if price is less than or equal to 0', async () => {
    const { sut } = makeSut();
    const productData: CreateProductModel.Params = {
      name: 'Product',
      brand: 'any_brand',
      description: 'any_description',
      price: 0,
      quantity: 10,
    };
    const promise = sut.execute(productData);
    await expect(promise).rejects.toThrow();
    expect(promise).rejects.toThrow('price is not valid for a product');
  });

  it('should call productRepository with correct values', async () => {
    const { sut, createProductRepository } = makeSut();
    const createSpy = jest.spyOn(createProductRepository, 'create');
    const productData: CreateProductModel.Params = {
      name: 'valid_name',
      brand: 'valid_brand',
      description: 'valid_description',
      price: 10,
      quantity: 10,
      images: null,
      discount: null,
      category: [],
      status: Product.Status.ACTIVE,
    };
    await sut.execute(productData);
    expect(createSpy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'valid_name',
      brand: 'valid_brand',
      description: 'valid_description',
      price: 10,
      quantity: 10,
      images: null,
      discount: null,
      category: [],
      status: Product.Status.ACTIVE,
    }));
  });
});
