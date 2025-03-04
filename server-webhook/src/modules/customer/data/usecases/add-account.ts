import { AddAccount, AddAccountModel } from "../../domain/usecases/add-aacount";

export class AddAccountUseCase implements AddAccount {
  async execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result> {
    throw new Error("Method not implemented.");
  }
}
