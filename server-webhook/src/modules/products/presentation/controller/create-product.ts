import { Controller } from "../../../../globals/protocol/controller";
import { HttpRequest } from "../../../../globals/protocol/request";
import { HttpResponse } from "../../../../globals/protocol/response";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'brand', 'description', 'price'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`missing param: ${field}`)
        }
      }
    }
  }
}
