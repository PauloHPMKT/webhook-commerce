import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest } from "../../../../shared/presentation/helpers/http-responses";
import { EmailValidator } from "../protocols/email-validator";
import { InvalidParamError } from "../../../../shared/presentation/errors/invalid-param-error";

export class SignUpCustomerController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, passwordConfirmation } = httpRequest.body;
    const requiredFields = Object.keys({ name, email, password, passwordConfirmation });
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const isEmail = this.emailValidator.isValid(email);
    if (!isEmail) {
      return badRequest(new InvalidParamError('email'));
    }
  }
}
