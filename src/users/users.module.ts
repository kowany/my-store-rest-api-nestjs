import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from './../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, OrdersController, UsersController],
  providers: [CustomersService, OrdersService, UsersService],
})
export class UsersModule {}
