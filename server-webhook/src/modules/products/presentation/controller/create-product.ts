import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../globals/protocol";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['name', 'brand', 'description', 'price', 'quantity'];
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
