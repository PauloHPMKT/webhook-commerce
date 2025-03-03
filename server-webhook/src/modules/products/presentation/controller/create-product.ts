import { Controller } from "../../../../globals/protocol/controller";
import { HttpRequest } from "../../../../globals/protocol/request";
import { HttpResponse } from "../../../../globals/protocol/response";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('name is not valid for a product')
      }
    }

    if (!httpRequest.body.brand) {
      return {
        statusCode: 400,
        body: new Error('brand is not valid for a product')
      }
    }

    if (!httpRequest.body.description) {
      return {
        statusCode: 400,
        body: new Error('add a description for a product')
      }
    }
  }
}
