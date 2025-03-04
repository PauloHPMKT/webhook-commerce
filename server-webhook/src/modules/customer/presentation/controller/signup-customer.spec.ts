import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { InvalidParamError } from "../../../../shared/presentation/errors/invalid-param-error";
import { Controller } from "../../../../shared/presentation/protocol";
import { EmailValidator } from "../protocols/email-validator";
import { SignUpCustomerController } from "./signup-customer";

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpCustomerController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

interface SutTypes {
  sut: Controller
  emailValidatorStub: EmailValidator
}

describe('SignupCustomerController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('name'))
  });

  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  });

  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('password'))
  })

  it('should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'email@mail.com',
        password: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('passwordConfirmation'))
  });

  it('should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('email'))
  });
});
