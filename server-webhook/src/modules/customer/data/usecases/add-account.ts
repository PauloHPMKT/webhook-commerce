import { AddAccount, AddAccountModel } from "../../domain/usecases/add-aacount";
import { Encrypter } from "../protocols/encrypter";
import { FindCustomerRepository } from "../protocols/find-customer-repository";

export class AddAccountUseCase implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly findCustomerByEmailRepository: FindCustomerRepository
  ) {}

  async execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result> {
    const customerExists = await this.findCustomerByEmailRepository.findByEmail(data.email);
    if (customerExists) {
      throw new Error('Customer already exists');
    }
    await this.encrypter.hash(data.password);
    return new Promise(resolve => resolve(null));
  }
}
