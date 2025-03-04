import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { InvalidParamError } from "../../../../shared/presentation/errors/invalid-param-error";
import { Controller } from "../../../../shared/presentation/protocol";
import { EmailValidator } from "../protocols/email-validator";
import { SignUpCustomerController } from "./signup-customer";
import { AddAccountModel } from "../../domain/models/add-aacount";
import { AddAccount } from "../../domain/usecases/add-account";

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    execute(account: AddAccountModel.Params): Promise<AddAccountModel.Result> {
      return new Promise(resolve => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'any_email@mail.com',
        password: 'valid_password',
        role: 'customer',
        isActive: true,
        avatar: null,
        created_at: new Date('2015-05-05')
      }));
    }
  }
  return new AddAccountStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const addAccountStub = makeAddAccount()
  const emailValidatorStub = makeEmailValidator()
  const sut = new SignUpCustomerController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

interface SutTypes {
  sut: Controller
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
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

  it('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  });

  it('should return 400 if passwordConfirmation not match', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new InvalidParamError('passwordConfirmation'))
  });

  it('should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const result = await sut.handle(httpRequest)
    expect(result.statusCode).toBe(500)
    expect(result.body).toEqual(new Error('Internal server error'))
  });

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut();
    jest.spyOn(addAccountStub, 'execute')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    await sut.handle(httpRequest)
    expect(addAccountStub.execute).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'password',
    });
  });

  it('should return 201 if valid data is provided to create a customer', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'valid_password',
      role: 'customer',
      isActive: true,
      avatar: null,
      created_at: new Date('2015-05-05')
    });
  });
});
