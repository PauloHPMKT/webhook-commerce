import { MissingParamError } from "../../../../shared/presentation/errors/missing-param-error";
import { Controller } from "../../../../shared/presentation/protocol/controller";
import { CreateProduct } from "../../domain/usecases/create-product";
import { CreateProductController } from "./create-product";

const makeCreateProductUseCase = (): CreateProduct => {
  class CreateProductUseCaseStub implements CreateProduct {
    async execute(data: any): Promise<any> {
      return new Promise(resolve => resolve({}));
    }
  }
  return new CreateProductUseCaseStub();
}

const makeSut = (): SutTypes => {
  const createProductUseCaseStub = makeCreateProductUseCase();
  const sut = new CreateProductController(createProductUseCaseStub);
  return {
    sut,
    createProductUseCaseStub
  };
}

interface SutTypes {
  sut: Controller;
  createProductUseCaseStub: CreateProduct;
}

describe('CreateProductController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 400 if no name is provided', async () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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

  it('should return 400 if price is not typeof number', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        price: "invalid_price",
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(new Error('invalid param: price'));
  });

  it('should call CreateProductUseCase with correct values', async () => {
    const { sut, createProductUseCaseStub } = makeSut();
    const executeSpy = jest.spyOn(createProductUseCaseStub, 'execute');
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        price: 10,
        quantity: 10,
      }
    }
    await sut.handle(httpRequest);
    expect(executeSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 500 if CreateProductUseCase throws', async () => {
    const { sut, createProductUseCaseStub } = makeSut();
    jest.spyOn(createProductUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest = {
      body: {
        name: 'any_name',
        brand: 'any_brand',
        description: 'any_description',
        price: 10,
        quantity: 10,
      }
    }
    const response = await sut.handle(httpRequest);
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new Error('Internal server error'));
  })
})
