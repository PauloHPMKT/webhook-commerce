export interface SendPayment {
  send(paymentData: any): Promise<void>;
}
