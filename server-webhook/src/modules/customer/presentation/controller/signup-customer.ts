import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest } from "../../../../shared/presentation/helpers/http-responses";

export class SignUpCustomerController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, passwordConfirmation } = httpRequest.body;
    const requiredFields = Object.keys({ name, email, password, passwordConfirmation });
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }
  }
}
