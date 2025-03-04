import { Customer } from "../enitites/Customer"

export namespace AddAccountModel {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = Customer
}

