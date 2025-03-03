import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { OrderEntity } from '../../domain/entities/Order';
import { CreateOrderRepository } from '../../data/protocol/create-order';
import { GetOrdersRepository } from '../../data/protocol/get-orders';
import { UpdateOrderStatusRepository } from '../../data/protocol/update-order-status';
import { FindOrderRepository } from '../../data/protocol/find-order';

export class OrderRepository implements
  CreateOrderRepository,
  GetOrdersRepository,
  UpdateOrderStatusRepository,
  FindOrderRepository
{
  private readonly DB_FILE = 'orders.json';

  private getFilePath(): string {
    // @ts-ignore
    const __dirname = dirname(fileURLToPath(import.meta.url));
    return join(__dirname, this.DB_FILE);
  }

  loadOrders(): OrderEntity[] {
    const filePath = this.getFilePath();
    if (!existsSync(filePath)) {
      return [];
    }
    try {
      const data = readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      return [];
    }
  }

  saveOrders(orders: OrderEntity[]) {
    try {
      writeFileSync(this.getFilePath(), JSON.stringify(orders, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  }

  async create(data: OrderEntity): Promise<OrderEntity> {
    let orders: OrderEntity[] = this.loadOrders();
    const newOrder = {
      id: data.id,
      status: data.status,
      paymentData: [
        {
          transactionId: Math.random().toString(36).substring(2, 15),
          amount: data.paymentData[0].amount,
          currency: data.paymentData[0].currency,
          paymentMethod: data.paymentData[0].paymentMethod,
          creditCard: {
            number: data.paymentData[0].creditCard.number,
            expirationDate: data.paymentData[0].creditCard.expirationDate,
            cvv: data.paymentData[0].creditCard.cvv,
          },
        },
      ],
      created_at: new Date(),
      updated_at: null,
    };


    orders.push(newOrder);
    this.saveOrders(orders);

    return newOrder;
  }

  async getOrders(): Promise<OrderEntity[]> {
    return this.loadOrders();
  }

  async update(order: OrderEntity): Promise<any> {
    let orders: OrderEntity[] = this.loadOrders();
    const findOrder = (item: OrderEntity) =>
      item.paymentData[0].transactionId === order.paymentData[0].transactionId;
    const index = orders.findIndex(findOrder);
    if (index === -1) {
      return null;
    }
    orders[index] = order;
    this.saveOrders(orders);
    return order;
  }

  async find(transactionId: string): Promise<OrderEntity> {
    let orders: OrderEntity[] = this.loadOrders();
    const findOrder = (order: OrderEntity) =>
      order.paymentData[0].transactionId === transactionId;
    return orders.find(findOrder);
  }
}
