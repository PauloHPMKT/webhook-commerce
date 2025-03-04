import { Customer } from "../../domain/enitites/Customer";
import { AddAccountRepositoryModel } from "../../domain/models/add-account-repositpry";
import { AddAccountRepository } from "../protocols/add-account-repository";
import { Encrypter } from "../protocols/encrypter";
import { FindCustomerRepository } from "../protocols/find-customer-repository";
import { AddAccountUseCase } from "./add-account";

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountRepositoryModel.Params): Promise<AddAccountRepositoryModel.Result> {
      return new Promise((resolve) => resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        isActive: true,
        role: Customer.Role.CUSTOMER,
        avatar: null,
        created_at: new Date('20215-09-01')
      }));
    }
  }
  return new AddAccountRepositoryStub();
}

const makeFindCustomerByEmailRepository = (): FindCustomerRepository => {
  class FindCustomerByEmailRepositoryStub implements FindCustomerRepository {
    async findByEmail(email: string): Promise<boolean> {
      return new Promise((resolve) => resolve(false));;
    }
  }
  return new FindCustomerByEmailRepositoryStub();
}

const makeEncripter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async hash(value: string): Promise<string> {
      return 'hashed_password';
    }
  }
  return new EncrypterStub();
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository();
  const findCustomerByEmailRepositoryStub = makeFindCustomerByEmailRepository();
  const encrypterStub = makeEncripter();
  const sut = new AddAccountUseCase(
    encrypterStub,
    findCustomerByEmailRepositoryStub,
    addAccountRepositoryStub
  );
  return {
    sut,
    encrypterStub,
    findCustomerByEmailRepositoryStub,
    addAccountRepositoryStub
  }
}

interface SutTypes {
  sut: AddAccountUseCase;
  encrypterStub: Encrypter;
  findCustomerByEmailRepositoryStub: FindCustomerRepository;
  addAccountRepositoryStub: AddAccountRepository;
}

describe('AddAccountUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should throw an exception if customer exists', async () => {
    const { sut, findCustomerByEmailRepositoryStub } = makeSut();
    jest.spyOn(findCustomerByEmailRepositoryStub, 'findByEmail').mockImplementationOnce(async () => {
      return true;
    });
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    const promise = sut.execute(accountData);
    await expect(promise).rejects.toThrow('Customer already exists');
  });

  it('should call Encrypter with correct password', async () =>{
    const { sut, encrypterStub } = makeSut();
    const hashSpy = jest.spyOn(encrypterStub, 'hash');
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.execute(accountData);
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  it('should thorw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'hash').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error())),
    );
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    };
    const promise = sut.execute(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add');
    const accountData = {
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.execute(accountData);
    expect(addSpy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'valid_name',
      email: 'any_email@mail.com',
      password: 'hashed_password',
      isActive: true,
      role: Customer.Role.CUSTOMER,
      avatar: null,
      created_at: expect.any(Date)
    }));
  })
});
