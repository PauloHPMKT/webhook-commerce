import { Controller } from "../../../../shared/presentation/protocol";
import { Order } from "../../domain/entities/Order";
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
  let created_at: Date;

  beforeAll(() => {
    created_at = new Date("2025-03-02T23:27:26.064Z");
  })

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
  });

  it('should return 200 if orders are found', async () => {
    const { sut, getOrdersUseCase } = makeSut();
    jest.spyOn(getOrdersUseCase, 'execute').mockResolvedValueOnce([
      {
        id: "valid_id_1",
        status: Order.Status.CREATED,
        paymentData: [
          {
            transactionId: "h6ojixxqsmn",
            amount: 100,
            currency: "USD",
            paymentMethod: "credit_card",
            creditCard: {
              number: "1234567890123456",
              expirationDate: "12/2022",
              cvv: "123"
            }
          }
        ],
        created_at,
        updated_at: null
      },
      {
        id: "valid_id_2",
        status: Order.Status.CREATED,
        paymentData: [
          {
            transactionId: "h6ojixxqsmn",
            amount: 100,
            currency: "USD",
            paymentMethod: "credit_card",
            creditCard: {
              number: "1234567890123456",
              expirationDate: "12/2022",
              cvv: "123"
            }
          }
        ],
        created_at,
        updated_at: null
      },
    ]);
    const response = await sut.handle();
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      {
        id: "valid_id_1",
        status: "CREATED",
        paymentData: [
          {
            transactionId: "h6ojixxqsmn",
            amount: 100,
            currency: "USD",
            paymentMethod: "credit_card",
            creditCard: {
              number: "1234567890123456",
              expirationDate: "12/2022",
              cvv: "123"
            }
          }
        ],
        created_at,
        updated_at: null
      },
      {
        id: "valid_id_2",
        status: "CREATED",
        paymentData: [
          {
            transactionId: "h6ojixxqsmn",
            amount: 100,
            currency: "USD",
            paymentMethod: "credit_card",
            creditCard: {
              number: "1234567890123456",
              expirationDate: "12/2022",
              cvv: "123"
            }
          }
        ],
        created_at,
        updated_at: null
      },
    ]);
  });

  it('should return 500 if GetOrders throws', async () => {
    const { sut, getOrdersUseCase } = makeSut();
    jest.spyOn(getOrdersUseCase, 'execute').mockRejectedValueOnce(new Error());
    const response = await sut.handle();
    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(new Error('Internal server error'));
  })
});
