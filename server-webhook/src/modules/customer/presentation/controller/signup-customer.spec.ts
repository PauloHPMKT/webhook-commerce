import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
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

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const response = {
      body: {
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(response)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('name'))
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const response = {
      body: {
        name: 'any_name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(response)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const response = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(response)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('password'))
  });
});
