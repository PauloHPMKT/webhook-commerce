import { Controller } from "../../../../shared/presentation/protocol";
import { GetOrdersModel } from "../../domain/models/get-orders";
import { GetOrders } from "../../domain/protocols/usecases/get-orders";
import { GetOrdersController } from "./get-orders";

const makeGetOrdersUseCase = (): GetOrders => {
  class GetOrdersStub implements GetOrders {
    async execute(): Promise<GetOrdersModel.Response> {
      return [];
    }
  }
  return new GetOrdersStub();
}

const makeSut = (): SutTypes => {
  const getOrdersUseCase = makeGetOrdersUseCase();
  const sut = new GetOrdersController(getOrdersUseCase);
  return {
    sut,
    getOrdersUseCase,
  }
}

interface SutTypes {
  sut: Controller;
  getOrdersUseCase: GetOrders;
}

describe('GetOrdersController', () => {
  it('should be defined', () => {
    const { sut } = makeSut();
    expect(sut).toBeDefined();
  });

  it('should return 204 if no orders are found', async () => {
    const { sut, getOrdersUseCase } = makeSut();
    jest.spyOn(getOrdersUseCase, 'execute').mockResolvedValueOnce([]);
    const response = await sut.handle();
    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual([]);
  })
});
