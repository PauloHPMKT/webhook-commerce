export class CartItem {
  public productId: string;
  public quantity: number;
  public price: number;
  public totalPrice?: number;
  public added_at?: Date;
  public updated_at?: Date | null;

  constructor(items: Omit<CartItem, 'checkQuantity' | 'checkPrice'>) {
    Object.assign(this, items);

    this.checkQuantity(items.quantity);
    this.checkPrice(items.price);
    this.totalPrice = items.quantity * items.price;
    this.added_at = items.added_at ?? new Date();
    this.updated_at = items.updated_at ?? null;
  }

  private checkQuantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
  }

  private checkPrice(price: number) {
    if (price <= 0) {
      throw new Error('Price must be greater than 0');
    }
  }
}
