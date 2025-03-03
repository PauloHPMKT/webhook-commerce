import { Controller } from "../../../../globals/protocol/controller";
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
    expect(response.body).toEqual(new Error('name is not valid for a product'));
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
    expect(response.body).toEqual(new Error('brand is not valid for a product'));
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
    expect(response.body).toEqual(new Error('add a description for a product'));
  });
})
