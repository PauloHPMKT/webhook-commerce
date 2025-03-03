import { CreateOrderUseCase } from "../../../../../modules/orders/data/usecases/create-order";
import { CreateOrder } from "../../../../../modules/orders/domain/protocols/usecases/create-order";
import { PaymentValidator } from "../../../../../modules/orders/domain/validator/payment";
import { OrderRepository } from "../../../../../modules/orders/infra/db/order-repository";
import { HttpService } from "../../../../../modules/orders/infra/http-service/http";
import { HubPayment } from "../../../../../modules/orders/infra/payment-service/hub-payment";

export const makeCreateOrderUseCase = (): CreateOrder => {
  const orderRepository = new OrderRepository();
  const paymentValidator = new PaymentValidator();
  const httpService = new HttpService();
  const paymentService = new HubPayment(httpService);
  return new CreateOrderUseCase(
    paymentValidator,
    orderRepository,
    paymentService,
  );
}
