import { Encrypter } from "../../../../../modules/customer/data/protocols/encrypter";
import { AddAccountUseCase } from "../../../../../modules/customer/data/usecases/add-account";
import { Customer } from "../../../../../modules/customer/domain/enitites/Customer";
import { AddAccount } from "../../../../../modules/customer/domain/usecases/add-account";
import { BcryptAdapter } from "../../../../../shared/infra/criptography/bcrypt-adapter";


class FindCustomerRepository implements FindCustomerRepository {
  async findByEmail(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
class AddAccountRepository implements AddAccountRepository {
  async add(customer: Customer): Promise<Customer> {
    throw new Error('Method not implemented.');
  }
}

export const makeAddAccountUseCase = (): AddAccount => {
  const salt = 12
  const addAccountRepository = new AddAccountRepository();
  const findCustomerByEmailRepository = new FindCustomerRepository();
  const encrypter = new BcryptAdapter(salt);
  return new AddAccountUseCase(
    encrypter,
    findCustomerByEmailRepository,
    addAccountRepository
  );
}
