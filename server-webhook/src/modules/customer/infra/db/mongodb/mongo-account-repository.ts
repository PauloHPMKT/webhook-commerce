import { ObjectId } from "mongodb";
import { MongoHelper } from "../../../../../shared/infra/db/mongo-client";
import { AddAccountRepository } from "../../../data/protocols/add-account-repository";
import { FindCustomerRepository } from "../../../data/protocols/find-customer-repository";
import { AddAccountRepositoryModel } from "../../../domain/models/add-account-repositpry";

export class MongoAccountRepository implements
  AddAccountRepository,
  FindCustomerRepository
{
  async add(data: AddAccountRepositoryModel.Params): Promise<AddAccountRepositoryModel.Result> {
    const customerCollection = MongoHelper.getCollection('customers');
    const customerData = {
      ...data,
      _id: new ObjectId(data.id),
    };
    delete customerData.id;
    await customerCollection.insertOne(customerData);
    const customer = await customerCollection.findOne({ _id: customerData._id });
    return MongoHelper.map(customer);
  }

  async findByEmail(email: string): Promise<boolean> {
    const customerCollection = MongoHelper.getCollection('customers');
    const customer = await customerCollection.findOne(
      { email },
      { projection: { _id: 1 } }
    )
    return customer !== null;
  }
}
