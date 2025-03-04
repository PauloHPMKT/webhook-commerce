import { AddAccountUseCase } from "../../../../../modules/customer/data/usecases/add-account";
import { AddAccount } from "../../../../../modules/customer/domain/usecases/add-account";
import { MongoAccountRepository } from "../../../../../modules/customer/infra/db/mongodb/mongo-account-repository";
import { BcryptAdapter } from "../../../../../shared/infra/criptography/bcrypt-adapter";




export const makeAddAccountUseCase = (): AddAccount => {
  const salt = 12
  const mongoAccountRepository = new MongoAccountRepository();
  const addAccountRepository = mongoAccountRepository
  const findCustomerByEmailRepository = mongoAccountRepository;
  const encrypter = new BcryptAdapter(salt);
  return new AddAccountUseCase(
    encrypter,
    findCustomerByEmailRepository,
    addAccountRepository
  );
}
