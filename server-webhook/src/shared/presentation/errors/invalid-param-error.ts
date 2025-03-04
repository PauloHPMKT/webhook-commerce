export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`ivalid param: ${paramName}`);
    this.name = 'InvalidParamError';
  }
}
