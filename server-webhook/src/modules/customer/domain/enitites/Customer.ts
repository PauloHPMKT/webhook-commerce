import { randomBytes } from "crypto";

export class Customer {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public isActive?: boolean;
  public readonly role?: Customer.Role;
  public avatar?: string;
  public cartId?: string;
  public created_at?: Date;

  constructor(props: Omit<Customer, 'id'>, id?: string) {
    Object.assign(this, props);

    this.id = id ?? randomBytes(12).toString('hex');
    this.isActive = props.isActive ?? true;
    this.role = props.role ?? Customer.Role.CUSTOMER;
    this.avatar = props.avatar ?? null;
    this.created_at = props.created_at ?? new Date();
  }

  assignCart(cartId: string) {
    this.cartId = cartId;
  }
}

export namespace Customer {
  export enum Role {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
  }
}
