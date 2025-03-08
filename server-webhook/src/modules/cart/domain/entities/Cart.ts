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

  addItem(item: Cart.CartItem) {
    const { productId, quantity, price, totalPrice, added_at, updated_at } = item;
    const existingItem = this.items.find(
      it => it.productId === item.productId
    );
    if(existingItem) {
      existingItem.quantity += item.quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
      existingItem.updated_at = new Date();
      this.updated_at = new Date();
      return this;
    }
    this.items.push({
      productId,
      quantity,
      price,
      totalPrice,
      added_at,
      updated_at
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
    price: number
    totalPrice?: number
    added_at?: Date
    updated_at?: Date | null
  }
}
