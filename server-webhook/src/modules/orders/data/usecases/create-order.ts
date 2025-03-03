import { Order, OrderEntity } from "../../domain/entities/Order";
import { CreateOrder } from "../../domain/protocols/usecases/create-order";
import { PaymentValidator } from "../../domain/validator/payment";
import { CreateOrderDTO } from "../models/create-order";
import { CreateOrderRepository } from "../protocol/create-order";
import { SendPayment } from "../services/payment-hub";

export class CreateOrderUseCase implements CreateOrder {
  constructor(
    private readonly paymentValidator: PaymentValidator,
    private readonly orderRepository: CreateOrderRepository,
    private readonly paymentService: SendPayment
  ) {}

  async execute(data: CreateOrderDTO): Promise<OrderEntity> {
    this.paymentValidator.validate(data.paymentData);
    const order = new OrderEntity({
      status: data.status as Order.Status,
      paymentData: data.paymentData,
    });

    // enviar para a camada de repository
    const savedOrder = await this.orderRepository.create(order);

    // enviar para o servio de pagamento
    await this.paymentService.send(savedOrder);
    // enviar para o servio de logistica
    return savedOrder;
  }
}
