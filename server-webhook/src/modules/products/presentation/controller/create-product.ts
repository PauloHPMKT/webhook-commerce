import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import {
  badRequest,
  created,
  serverError
} from "../../../../shared/presentation/helpers/http-responses";
import { CreateProduct } from "../../domain/usecases/create-product";
import { CreateProductModel } from "../../domain/models/create-product";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";

export class CreateProductController implements Controller {
  constructor(private readonly createProduct: CreateProduct) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'brand', 'description', 'price', 'quantity'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {
        name, brand, description, price, quantity, images, discount, category,
      } = httpRequest.body;

      if (isNaN(price)) {
        return badRequest(new Error('invalid param: price'));
      }

      const productData = {
        name,
        brand,
        description,
        price,
        quantity,
        images,
        discount,
        category,
      } as CreateProductModel.Params;
      const product = await this.createProduct.execute(productData);

      return created(product);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
