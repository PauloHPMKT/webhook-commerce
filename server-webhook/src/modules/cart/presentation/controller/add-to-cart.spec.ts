import { Controller } from "../../../../shared/presentation/protocol";
import { AddToCart } from "../../domain/usecases/add-to-cart";
import { AddToCartController } from "./add-to-cart";

const makeAddCartUseCase = (): AddToCart => {
  class AddToCartStub implements AddToCart {
    async execute(data: any): Promise<any> {
      return new Promise(resolve => resolve({
        cartId: 'any_cart_id',
        products: [
          {
            productId: 'any_product_id',
            quantity: 1
          }
        ],
        quantity: 1
      }));
    }
  }
  return new AddToCartStub();
}

const makeSut = (): SutTypes => {
  const addToCartStub = makeAddCartUseCase();
  const sut = new AddToCartController(addToCartStub);
  return {
    sut,
    addToCartStub
  }
}

interface SutTypes {
  sut: Controller
  addToCartStub: AddToCart
}

describe('AddToCartController', () => {
  it('should call AddToCartUseCase with correct values', async () => {
    const { sut, addToCartStub } = makeSut();
    const executeSpy = jest.spyOn(addToCartStub, 'execute')
    const httpRequest = {
      body: {
        cartId: 'any_cart_id',
        productId: 'any_product_id',
        quantity: 1
      }
    }
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
