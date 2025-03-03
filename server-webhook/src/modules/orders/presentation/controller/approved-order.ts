import { ApprovedOrder } from "../../domain/protocols/usecases/approved-order";
import { Controller } from "../protocol/controller";
import { HttpRequest } from "../protocol/request";
import { HttpResponse } from "../protocol/response";

export class ApprovedOrderController implements Controller {
  constructor(private readonly approvedOrder: ApprovedOrder) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;
      const paymentOrderData = {
        transactionId: body.transactionId,
        status: body.status,
        notification: body.notification
      }

      const orderApproved = await this.approvedOrder.execute(paymentOrderData);
      return {
        statusCode: 200,
        body: orderApproved
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: {
          message: 'Internal server error'
        }
      }
    }
  }
}
