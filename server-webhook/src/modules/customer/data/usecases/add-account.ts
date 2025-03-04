import { Customer } from "../../domain/enitites/Customer";
import { AddAccountModel } from "../../domain/models/add-aacount";
import { AddAccount } from "../../domain/usecases/add-account";
import { AddAccountRepository } from "../protocols/add-account-repository";
import { Encrypter } from "../protocols/encrypter";
import { FindCustomerRepository } from "../protocols/find-customer-repository";

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly findCustomerByEmailRepository: FindCustomerRepository,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result> {
    const customerExists = await this.findCustomerByEmailRepository.findByEmail(data.email);
    if (customerExists) {
      throw new Error('Customer already exists');
    }
    const encryptedPassword = await this.encrypter.hash(data.password);
    const accountData = {
      name: data.name,
      email: data.email,
      password: encryptedPassword
    } as AddAccountModel.Params;

    const customer = new Customer(accountData);
    const account = await this.addAccountRepository.add(customer);
    return account;
  }
}
