import { AddToCartController } from "../../../../../modules/cart/presentation/controller/add-to-cart";
import { Controller } from "../../../../../shared/presentation/protocol";
import { makeAddToCartUseCase } from "../data/add-to-cart";

export const makeAddToCartController = (): Controller => {
  const addToCartUseCase = makeAddToCartUseCase();
  return new AddToCartController(addToCartUseCase);
}
