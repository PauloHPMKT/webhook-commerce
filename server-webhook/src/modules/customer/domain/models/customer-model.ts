import { Customer } from "../enitites/Customer";

export namespace FindCustomerModel {
  export type Params = {
    id?: string;
    userId: string;
  };

  export type Result = Customer
}
