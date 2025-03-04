import { Encrypter } from "../protocols/encrypter";
import { AddAccountUseCase } from "./add-account";

const makeEncripter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async hash(value: string): Promise<string> {
      return 'hashed_password';
    }
  }
  return new EncrypterStub();
}

const makeSut = (): SutTypes => {
  const encrypter = makeEncripter();
  const sut = new AddAccountUseCase(encrypter);
  return {
    sut,
    encrypter,
  }
}

interface SutTypes {
  sut: AddAccountUseCase;
  encrypter: Encrypter;
}

describe('AddAccountUseCase', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should call Encrypter with correct password', async () =>{
    const { sut, encrypter } = makeSut();
    const hashSpy = jest.spyOn(encrypter, 'hash');
    const accountData = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }
    await sut.execute(accountData);
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });
});
