export class CreateOrderDTO {
  public status: string;
  public paymentData: any[];

  constructor(props: CreateOrderDTO) {
    Object.assign(this, props);
  }

  public toCreateOrder() {
    return {
      status: this.status,
      paymentData: this.paymentData,
    };
  }
}
