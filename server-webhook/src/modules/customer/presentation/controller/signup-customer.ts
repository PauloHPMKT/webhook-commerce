import {
  Controller,
  HttpRequest,
  HttpResponse
} from "../../../../shared/presentation/protocol";
import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { badRequest, serverError } from "../../../../shared/presentation/helpers/http-responses";
import { EmailValidator } from "../protocols/email-validator";
import { InvalidParamError } from "../../../../shared/presentation/errors/invalid-param-error";
import { AddAccount, AddAccountModel } from "../../domain/usecases/add-aacount";

export class SignUpCustomerController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
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

      await this.addAccount.execute({
        name,
        email,
        password
      } as AddAccountModel.Params);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
