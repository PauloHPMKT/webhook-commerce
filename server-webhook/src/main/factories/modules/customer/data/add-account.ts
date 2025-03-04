import { Encrypter } from "../../../../../modules/customer/data/protocols/encrypter";
import { AddAccountUseCase } from "../../../../../modules/customer/data/usecases/add-account";
import { Customer } from "../../../../../modules/customer/domain/enitites/Customer";
import { AddAccount } from "../../../../../modules/customer/domain/usecases/add-account";

class EncrypterAdater implements Encrypter {
  async hash(value: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
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
  const addAccountRepository = new AddAccountRepository();
  const findCustomerByEmailRepository = new FindCustomerRepository();
  const encrypter = new EncrypterAdater();
  return new AddAccountUseCase(
    encrypter,
    findCustomerByEmailRepository,
    addAccountRepository
  );
}
