import { AddAccountUseCase } from "./add-account";

const makeSut = (): SutTypes => {
  const sut = new AddAccountUseCase();
  return {
    sut
  }
}

interface SutTypes {
  sut: AddAccountUseCase;
}

describe('AddAccountUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });
});
