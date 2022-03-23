import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { ProductsService } from './../../products/services/products.service';

import { Order } from '../entities/order.entity';
import { User } from './../entities/user.entity';

import { CreateUserDto, UpdateUserDto } from './../dtos/user.dtos';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'jorgito@gmail.com',
      password: '123456',
      role: 'admin',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey);
    console.log(dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((user) => user.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User #${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }
  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    console.log(user);
    console.log(new Date());
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
