import { AddToCartUseCase } from "../../../../../modules/cart/data/usecases/add-to-cart";
import { AddToCart } from "../../../../../modules/cart/domain/usecases/add-to-cart";
import { MongoCartRepository } from "../../../../../modules/cart/infra/db/mongodb/mongo-cart-repository";
import { MongoAccountRepository } from "../../../../../modules/customer/infra/db/mongodb/mongo-account-repository";
import { CustomerService } from "../../../../../shared/services/customer-service";

export const makeAddToCartUseCase = (): AddToCart => {
  const customerRepository = new MongoAccountRepository();
  const cartRepository = new MongoCartRepository();
  const createCartRepository = cartRepository;
  const updateCartRepository = cartRepository;
  const findCartByCustomer = cartRepository;
  const getCustomerById = customerRepository;
  const findCustomerAndUpdateCart = customerRepository;
  const customerService = new CustomerService(getCustomerById, findCustomerAndUpdateCart);

  return new AddToCartUseCase(
    customerService,
    createCartRepository,
    updateCartRepository,
    findCartByCustomer
  );
}
