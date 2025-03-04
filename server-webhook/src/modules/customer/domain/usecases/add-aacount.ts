export namespace AddAccountModel {
  export type Params = {
    name: string
    email: string
    password: string
  }
  export type Result = {
    id: string
    name: string
    email: string
    password: string
    isActive: boolean
    avatar?: string | null
    created_at?: Date
  }
}

export interface AddAccount {
  execute(data: AddAccountModel.Params): Promise<AddAccountModel.Result>
}
