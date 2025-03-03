import { Controller } from "../../../../globals/protocol/controller";
import { CreateProductController } from "./create-product";

const makeSut = (): Controller => {
  return new CreateProductController();
}

describe('CreateProductController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });
})
