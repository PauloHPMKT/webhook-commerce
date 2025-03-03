import { CreateOrderDTO } from "../../data/models/create-order";
import { CreateOrder } from "../../domain/protocols/usecases/create-order";
import { badRequest, created, serverError } from "../../../../shared/presentation/helpers/http-responses";
import { Controller } from "../../../../shared/presentation/protocol/controller";
import { HttpRequest } from "../../../../shared/presentation/protocol/request";
import { HttpResponse } from "../../../../shared/presentation/protocol/response";

export class CreateOrderController implements Controller {
  constructor(private readonly createOrderUseCase: CreateOrder) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = httpRequest.body as CreateOrderDTO;
      const order = await this.createOrderUseCase.execute(data);
      if (!order) {
        return badRequest(new Error('Order not created'));
      }

      return created(order);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
