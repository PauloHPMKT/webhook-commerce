import { CreateProductModel } from "../../domain/models/create-product";
import { CreateProductUseCase } from "./create-product";

const makeSut = () => {
  const sut = new CreateProductUseCase();
  return {
    sut,
  };
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
  })
});
