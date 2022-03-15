import { Controller, Get, Query, Param, Post, Body, Delete, Put } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get('')
  getOrders(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return `order: limit => ${limit}, offset => ${offset}`;
  }

  @Get(':orderId')
  getOrder(@Param('orderId') orderId: string) {
    return `order: ${orderId}`;
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acción de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any ) {
    return {
      id,
      payload,
    };
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    };
  }
}
