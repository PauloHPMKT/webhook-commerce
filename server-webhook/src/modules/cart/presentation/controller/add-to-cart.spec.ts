import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { Controller } from "../../../../shared/presentation/protocol";
import { AddToCartModel } from "../../domain/models/add-to-cart-model";
import { AddToCart } from "../../domain/usecases/add-to-cart";
import { AddToCartController } from "./add-to-cart";

const makeAddCartUseCase = (): AddToCart => {
  class AddToCartStub implements AddToCart {
    async execute(data: AddToCartModel.Params): Promise<AddToCartModel.Result> {
      return new Promise(resolve => resolve({
        id: 'any_cart_id',
        items: [
          {
            productId: 'any_product_id',
            quantity: 1,
            price: 10,
            totalPrice: 10,
            added_at: new Date('2025-09-01'),
            updated_at: null
          }
        ],
        userId: 'any_user_id',
        created_at: new Date('2025-09-01'),
        updated_at: null
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
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no productId is provided', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        quantity: 1
      }
    }
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('productId'));
  });

  it('should call AddToCartUseCase with correct values', async () => {
    const { sut, addToCartStub } = makeSut();
    const executeSpy = jest.spyOn(addToCartStub, 'execute')
    const httpRequest = {
      body: {
        customerId: 'any_customer_id',
        productId: 'any_product_id',
        quantity: 1,
        price: 10
      }
    }
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
