import { AddAccount, AddAccountModel } from "../../domain/usecases/add-aacount";
import { Encrypter } from "../protocols/encrypter";

export class AddAccountUseCase implements AddAccount {
  constructor(private readonly encrypter: Encrypter) {}

  async execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result> {
    await this.encrypter.hash(data.password);
    return new Promise(resolve => resolve(null));
  }
}
