import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest } from "../../../../shared/presentation/helpers/http-responses";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, brand, description, price, quantity } = httpRequest.body;
    const requiredFields = ['name', 'brand', 'description', 'price', 'quantity'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    if (isNaN(price)) {
      return badRequest(new Error('invalid param: price'));
    }
  }
}
