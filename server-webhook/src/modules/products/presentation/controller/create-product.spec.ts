import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { Controller } from "../../../../shared/presentation/protocol/controller";
import { CreateProductController } from "./create-product";

const makeSut = (): Controller => {
  return new CreateProductController();
}

describe('CreateProductController', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no name is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        brand: 'any_brand',
        description: 'any_description',
        price: 10,
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no brand is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        description: 'any_description',
        price: 10,
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('brand'));
  });

  it('should return 400 if no description is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        price: 10,
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('description'));
  });

  it('should return 400 if no price is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('price'));
  });

  it('should return 400 if no quantity is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        price: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new MissingParamError('quantity'));
  });

  it('should return 400 if product name is invalid', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'an',
        brand: 'any_brand',
        description: 'any_description',
        price: 10,
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('name is not valid for a product'));
  })

  it('should return 400 if price is not typeof number', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        price: "29.90",
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('invalid param: price'));
  })
})
