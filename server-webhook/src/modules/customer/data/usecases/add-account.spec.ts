import { Encrypter } from "../protocols/encrypter";
import { FindCustomerRepository } from "../protocols/find-customer-repository";
import { AddAccountUseCase } from "./add-account";

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
  const findCustomerByEmailRepositoryStub = makeFindCustomerByEmailRepository();
  const encrypterStub = makeEncripter();
  const sut = new AddAccountUseCase(encrypterStub, findCustomerByEmailRepositoryStub);
  return {
    sut,
    encrypterStub,
    findCustomerByEmailRepositoryStub
  }
}

interface SutTypes {
  sut: AddAccountUseCase;
  encrypterStub: Encrypter;
  findCustomerByEmailRepositoryStub: FindCustomerRepository;
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
    await expect(promise).rejects.toThrow();
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
});
