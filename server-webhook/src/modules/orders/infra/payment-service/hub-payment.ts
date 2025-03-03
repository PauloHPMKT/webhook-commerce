import { SendPayment } from "../../data/services/payment-hub";
import { OrderEntity } from "../../domain/entities/Order";
import { HttpService } from "../http-service/http";

class SendPaymentDTO {
  status: string;
  transactions: object[];
}

export class HubPayment implements SendPayment {
  constructor(private readonly httpService: HttpService) {}

  // tenho que criar uma abstração para conversar com a minha camada de domínio
  async map(data: OrderEntity): Promise<SendPaymentDTO> {
    const mappedPaymentData: SendPaymentDTO = {
      status: this.mapOrderStatus(data.status),
      transactions: data.paymentData.map((payment) => ({
        id: payment.transactionId,
        amount: payment.amount,
        method: this.mapPaymentMethod(payment.paymentMethod),
        ...(payment.paymentMethod === 'credit_card' && {
          creditCardInfos: payment.creditCard,
        })
      })),
    };

    console.log('mappedPaymentData', mappedPaymentData.transactions[0]);

    return mappedPaymentData;
  }

  private mapPaymentMethod(method: string): string {
    console.log('method', method);
    const paymentMethod: { [key: string]: string } = {
      'credit_card': 'CC',
      'paypal': 'PP',
      'bank_transfer': 'BT',
    };

    return paymentMethod[method] || method;
  }

  private mapOrderStatus(status: string): string {
    const orderStatus: { [key: string]: string } = {
      'CREATED': 'pending',
      'PAID': 'approved',
      'CANCELLED': 'cancelled',
    };
    return orderStatus[status] || status;
  }

  private generatePaymentId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  async send(payment: OrderEntity): Promise<any> {
    const mappedPayment = await this.map(payment);
    try {
      const response = await this.httpService.post(mappedPayment);
      console.log(response, 'Ooooopa!!!!!!');
      return response;
    } catch (error) {
      console.error('Error sending payment:', error);
      throw error;
    }
  }
}
