import { randomBytes } from "crypto";

export class OrderEntity {
  public readonly id: string;
  public status: Order.Status;
  public cartItems: string[];
  public paymentData: any[];
  public created_at?: Date;
  public updated_at?: Date | null;

  constructor(
    props: Omit<OrderEntity, 'id' | 'cartItemsIds'> & { cartItems?: string[] },
    id?: string
  ) {
    Object.assign(this, props);
    this.id = id ?? randomBytes(12).toString('hex');
    this.status = props.status || Order.Status.CREATED;
    this.cartItems = props.cartItems ? [...props.cartItems] : [];
    this.paymentData = props.paymentData ?? [];
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  get cartItemsIds(): string[] {
    return [...this.cartItems];
  }

  addOrderItem(orderItemId: string): OrderEntity {
    if (this.cartItems.includes(orderItemId)) {
      return this;
    }
    return new OrderEntity({
      ...this,
      orderItems: [...this.cartItems, orderItemId]
    }, this.id);
  }
}

export namespace Order {
  export enum Status {
    CREATED = 'CREATED',
    PAID = 'PAID',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED'
  }
}
