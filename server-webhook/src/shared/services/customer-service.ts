import { FindCustomerAndUpdateCartRepository } from "../../modules/customer/data/protocols/find-customer-and-update-cart-repository";
import { GetCustomerByIdRepository } from "../../modules/customer/data/protocols/get-customer-repository";

export class CustomerService {
  constructor(
    private readonly findCustomer: GetCustomerByIdRepository,
    private readonly findAndUpdate: FindCustomerAndUpdateCartRepository
  ) {}

  async getCustomer(id: string) {
    return await this.findCustomer.getById(id);
  }

  async assignCart(customerId: string, cartId: string) {
    const customer = await this.findAndUpdate.findCustomerAndUpdateCart(
      customerId,
      cartId,
    );
    return customer;
  }
}
