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
});
