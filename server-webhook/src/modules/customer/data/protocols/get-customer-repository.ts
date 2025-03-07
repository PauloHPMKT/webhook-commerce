import { AddAccountRepositoryModel } from "../../domain/models/add-account-repositpry";

export interface GetCustomerByIdRepository {
  getById(id: string): Promise<AddAccountRepositoryModel.Result>
}
