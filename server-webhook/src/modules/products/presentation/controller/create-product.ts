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
        return {
          statusCode: 400,
          body: new Error(`missing param: ${field}`)
        }
      }
    }

    if (typeof price !== 'number') {
      return {
        statusCode: 400,
        body: new Error('invalid param: price')
      }
    }

  }
}
