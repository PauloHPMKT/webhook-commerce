import { CustomerService } from "../../../../shared/services/customer-service";
import { Cart } from "../../domain/entities/Cart";
import { AddToCartModel } from "../../domain/models/add-to-cart-model";
import { AddToCart } from "../../domain/usecases/add-to-cart";
import { CreateCartRepository } from "../protocols/create-cart-repository";
import { FindCartByCustomerRepository } from "../protocols/find-cart-by-customer-repository";
import { UpdateCartRepository } from "../protocols/update-cart-repository";

export class AddToCartUseCase implements AddToCart {
  constructor(
    private readonly customerService: CustomerService,
    private readonly createCartRepository: CreateCartRepository,
    private readonly updateCartRepository: UpdateCartRepository,
    private readonly findCartByCustomer: FindCartByCustomerRepository
  ) {}

  async execute(data: AddToCartModel.Params): Promise<AddToCartModel.Result> {
    const customer = await this.customerService.getCustomer(data.customerId);
    let cart: Cart;

    if (!customer.cartId) {
      cart = new Cart({
        items: [],
        userId: data.customerId,
      });

      await this.createCartRepository.create(cart);
      await this.customerService.assignCart(customer.id, cart.id);
    }
    const cartData = await this.findCartByCustomer.findById(customer.id);
    cart = new Cart(
      { ...cartData },
      cartData.id
    ).addItem(data.productId, data.quantity);

    return await this.updateCartRepository.update(cart);
  }
}
