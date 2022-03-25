import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('')
  getCustomers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return this.customerService.getAll();
  }

  @Get(':customerId')
  getBrand(@Param('customerId') customerId: string) {
    return this.customerService.getOne(+customerId);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    console.log(payload);
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
