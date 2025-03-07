import { randomBytes } from "crypto";

export class Cart {
  public readonly id: string;
  public items: Cart.CartItem[];
  public userId: string;
  public created_at?: Date;
  public updated_at?: Date | null;

  constructor(
    props: Omit<Cart, 'id' | 'addItem' | 'removeItem' | 'updateItemQuantity' | 'getTotal'>,
    id?: string
  ) {
    Object.assign(this, props);

    this.id = id ?? randomBytes(12).toString('hex');
    this.items = props.items ?? [];
    this.created_at = props.created_at ?? new Date();
    this.updated_at = props.updated_at ?? null;
  }

  addItem(productId: string, quantity: number) {
    const existingItem = this.items.find(
      item => item.productId === productId
    );
    existingItem
      ? existingItem.quantity += quantity
      : this.items.push({
          productId,
          quantity,
        });
    this.updated_at = new Date();
    return this;
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.productId !== productId);
    this.updated_at = new Date();
  }

  updateItemQuantity(productId: string, quantity: number) {
    const item = this.items.find(
      item => item.productId === productId
    );
    if (item) {
      item.quantity = quantity;
      this.updated_at = new Date();
    }
  }

  getTotal(products: { id: string, price: number }[]) {
    return this.items.reduce((total, item) => {
      const product = products.find(product => product.id === item.productId);
      return total + (product ? product?.price * item.quantity : 0);
    }, 0);
  }
}

export namespace Cart {
  export interface CartItem {
    productId: string
    quantity: number
  }
}
