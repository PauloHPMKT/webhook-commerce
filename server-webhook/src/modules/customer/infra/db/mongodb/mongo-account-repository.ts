import { AddAccountRepository } from "../../../data/protocols/add-account-repository";
import { FindCustomerRepository } from "../../../data/protocols/find-customer-repository";
import { AddAccountRepositoryModel } from "../../../domain/models/add-account-repositpry";

export class MongoAccountRepository implements
  AddAccountRepository,
  FindCustomerRepository
{
  async add(data: AddAccountRepositoryModel.Params): Promise<AddAccountRepositoryModel.Result> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
