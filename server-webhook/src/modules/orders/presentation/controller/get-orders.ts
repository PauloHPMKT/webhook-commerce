import { GetOrders } from "../../domain/protocols/usecases/get-orders";
import { noContent, ok, serverError } from "../helpers/http-responses";
import { Controller } from "../protocol/controller";
import { HttpResponse } from "../protocol/response";

export class GetOrdersController implements Controller {
  constructor(private readonly getOrders: GetOrders) {}

  async handle(): Promise<HttpResponse> {
    try {
      const orders = await this.getOrders.execute();
      if (!orders.length) {
        return noContent([]);
      }
      return ok(orders);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
