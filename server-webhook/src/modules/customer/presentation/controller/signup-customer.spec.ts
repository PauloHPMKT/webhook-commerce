import { Controller } from "../../../../shared/presentation/protocol";
import { SignUpCustomerController } from "./signup-customer";

const makeSut = (): SutTypes => {
  const sut = new SignUpCustomerController()
  return {
    sut,
  }
}

interface SutTypes {
  sut: Controller
}

describe('SignupCustomerController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  });
});
