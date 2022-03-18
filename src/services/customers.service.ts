import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from './../dtos/customer.dtos';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Rosy',
      lastname: 'Villaverde',
      phone: '+50523110529',
    },
  ];

  getAll() {
    return this.customers;
  }

  getOne(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  create(payload: CreateCustomerDto) {
    console.log(payload);
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    console.log('New customer', newCustomer);
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.getOne(id);
    if (customer) {
      const index = this.customers.findIndex((customer) => customer.id === id);
      this.customers[index] = {
        ...customer,
        ...payload,
      };
      return this.customers[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.customers.findIndex((customer) => customer.id === 1);
    if (index === -1) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
