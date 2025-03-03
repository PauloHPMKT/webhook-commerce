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

  it('should throw an erro if name is less than 3 characters', async () => {
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
  })
});
