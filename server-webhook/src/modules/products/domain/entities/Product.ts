import { randomBytes } from "crypto";

export class Product {
  public readonly id: string;
  public name: string;
  public brand: string;
  public description: string;
  public price: number;
  public quantity: number;
  public code?: string;
  public images?: string[];
  public status?: Product.Status;
  public discount?: number;
  public category?: string[];
  public createdAt?: Date;

  constructor(props: Omit<Product, 'id'>, id?: string) {
    Object.assign(this, props);

    this.id = id ?? randomBytes(12).toString('hex');
    this.code = this.generateProductCode();
    this.checkProductName(props.name);
    this.checkPrice(props.price);
    this.images = props.images ?? null;
    this.status = props.status ?? Product.Status.ACTIVE;
    this.discount = props.discount ?? null;
    this.category = props.category ?? [];
    this.createdAt = props.createdAt ?? new Date();
  }

  private generateProductCode(): string {
    return `${this.brand.substring(0, 3)
      .toUpperCase()}-${randomBytes(4)
      .toString('hex')
      .toUpperCase()}`;
  }

  private checkProductName(name: string) {
    if (!name || name.trim().length < 3) {
      throw new Error('name is not valid for a product');
    }
  }

  private checkPrice(price: number) {
    if (price <= 0) {
      throw new Error('price is not valid for a product');
    }
  }
}

export namespace Product {
  export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }
}
