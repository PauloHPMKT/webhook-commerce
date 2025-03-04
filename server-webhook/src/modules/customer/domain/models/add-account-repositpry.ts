import { Customer } from "../enitites/Customer";

export namespace AddAccountRepositoryModel {
  export type Params = Omit<Customer, 'id' | 'created_at' | 'isActive' | 'role'>;
  export type Result = Customer;
}
