import { AddAccountRepositoryModel } from "../../domain/models/add-account-repositpry"

export interface AddAccountRepository {
  add(
    data: AddAccountRepositoryModel.Params
  ): Promise<AddAccountRepositoryModel.Result>
}
