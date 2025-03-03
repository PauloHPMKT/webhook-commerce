import { randomBytes } from "crypto";

export class OrderEntity {
  public readonly id: string;
  public status: Order.Status;
  public paymentData: any[];
  public created_at?: Date;
  public updated_at?: Date | null;

  constructor(props: Omit<OrderEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? randomBytes(12).toString('hex');
    this.status = props.status || Order.Status.CREATED;
    this.paymentData = props.paymentData ?? [];
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
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
