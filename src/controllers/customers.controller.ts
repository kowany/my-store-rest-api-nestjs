import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get('')
  getCustomers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return `customer: limit => ${limit}, offset => ${offset}`;
  }

  @Get(':customerId')
  getBrand(@Param('customerId') customerId: string) {
    return `customer: ${customerId}`;
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

