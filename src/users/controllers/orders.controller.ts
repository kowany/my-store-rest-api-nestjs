import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './../dtos/order.dtos';
import { OrdersService } from './../services/orders.service';

@Controller('orders')
export class OrdersController {

  constructor(private ordersService: OrdersService) {}

  @Get('')
  getOrders(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.ordersService.getAll();
  }

  @Get(':orderId')
  getOrder(@Param('orderId') orderId: string) {
    return this.ordersService.getOne(+orderId);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
