export class PaymentValidator {
  private validPaymentMethods = ['credit_card', 'paypal', 'bank_transfer'];

  validate(paymentData: any[]): void {
    if (!paymentData || !paymentData.length) {
      throw new Error('Payment data is required');
    }

    paymentData.forEach(payment => {
      if (!this.validPaymentMethods.includes(payment.paymentMethod)) {
        throw new Error(`Invalid payment method: ${payment.method}`);
      }
    });

    if (paymentData.some(payment => payment.amount <= 0)) {
      throw new Error('Payment amount must be greater than zero');
    }
  }
}
