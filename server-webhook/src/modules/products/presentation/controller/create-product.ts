import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest, serverError } from "../../../../shared/presentation/helpers/http-responses";
import { CreateProduct } from "../../domain/usecases/create-product";

export class CreateProductController implements Controller {
  constructor(private readonly createProduct: CreateProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      const productData = {
        name,
        brand,
        description,
        price,
        quantity
      };
      await this.createProduct.execute(productData);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
