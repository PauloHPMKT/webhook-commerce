import validate from 'validator';
import { EmailValidator } from "../../../modules/customer/presentation/protocols/email-validator";
import { EmailValidatorAdapter } from './email-validator-adapter';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  }
}));

const makeSut = (): EmailValidator => {
  return new EmailValidatorAdapter();
}

describe('EmailValidator', () => {
  it('should return false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validate, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });
});
