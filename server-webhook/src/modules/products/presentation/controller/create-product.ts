import { Controller } from "../../../../globals/protocol/controller";
import { HttpRequest } from "../../../../globals/protocol/request";
import { HttpResponse } from "../../../../globals/protocol/response";

export class CreateProductController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return;
  }
}
