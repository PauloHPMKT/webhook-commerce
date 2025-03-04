import { Controller } from "../../../../../shared/presentation/protocol";
import { SignUpCustomerController } from "../../../../../modules/customer/presentation/controller/signup-customer";
import { EmailValidatorAdapter } from "../../../../../shared/presentation/utils/email-validator-adapter";
import { makeAddAccountUseCase } from "../data/add-account";

export const makeSignUpCustomerController = (): Controller => {
  const emailValidator = new EmailValidatorAdapter();
  const addAccountUseCase = makeAddAccountUseCase();
  return new SignUpCustomerController(emailValidator, addAccountUseCase);
}
