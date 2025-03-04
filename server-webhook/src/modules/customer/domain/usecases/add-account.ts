import { AddAccountModel } from "../models/add-aacount";

export interface AddAccount {
  execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result>
}
