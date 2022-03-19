import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dtos';
import { Order } from './../entities/order.entity';

@Injectable()
export class OrdersService {
  private counterId = 1;
  private orders: Order[] = [
    {
      id: 1,
      customerId: 1,
      orderDate: new Date('Mar 17 2022'),
      orderTotal: 1258.36,
    },
  ];

  getAll() {
    return this.orders;
  }

  getOne(id: number) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  create(payload: CreateOrderDto) {
    this.counterId = this.counterId + 1;
    const newOrder = {
      id: this.counterId,
      ...payload,
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  update(id: number, payload: UpdateOrderDto) {
    const order = this.getOne(id);
    if (order) {
      const index = this.orders.findIndex((order) => order.id === id);
      this.orders[index] = {
        ...order,
        ...payload,
      };
      return this.orders[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.orders.findIndex((order) => order.id === id);
    if (index === -1) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    this.orders.splice(index, 1);
    return true;
  }
}
