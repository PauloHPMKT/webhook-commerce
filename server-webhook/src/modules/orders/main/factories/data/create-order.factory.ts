import { CreateOrderUseCase } from "../../../data/usecases/create-order";
import { CreateOrder } from "../../../domain/protocols/usecases/create-order";
import { PaymentValidator } from "../../../domain/validator/payment";
import { OrderRepository } from "../../../infra/db/order-repository";
import { HttpService } from "../../../infra/http-service/http";
import { HubPayment } from "../../../infra/payment-service/hub-payment";

export const makeCreateOrderUseCase = (): CreateOrder => {
  const httpService = new HttpService();
  const paymentService = new HubPayment(httpService);
  const createOrderRepository = new OrderRepository();
  const paymentValidator = new PaymentValidator();
  return new CreateOrderUseCase(
    paymentValidator,
    createOrderRepository,
    paymentService,
  );
}
