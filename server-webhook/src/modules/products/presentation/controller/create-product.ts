import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest } from "../../../../shared/presentation/helpers/http-responses";
import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, brand, description, price, quantity } = httpRequest.body;
    const requiredFields = ['name', 'brand', 'description', 'price', 'quantity'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    if (name.trim().length < 3) {
      return badRequest(new Error('name is not valid for a product'));
    }

    if (typeof price !== 'number') {
      return badRequest(new Error('price is not valid for a product'));
    }

  }
}
