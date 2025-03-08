import {
  ok,
  badRequest,
  serverError
} from "../../../../shared/presentation/helpers/http-responses";
import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { AddToCartModel } from "../../domain/models/add-to-cart-model";
import { AddToCart } from "../../domain/usecases/add-to-cart";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";

export class AddToCartController implements Controller {
  constructor(private readonly addToCart: AddToCart) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { customerId, productId, quantity, price } = httpRequest.body;
      const requiredFields = ['productId', 'quantity'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }
      const data: AddToCartModel.Params = {
        customerId,
        productId,
        quantity,
        price,
      };

      const cart = await this.addToCart.execute(data);
      return ok(cart);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
