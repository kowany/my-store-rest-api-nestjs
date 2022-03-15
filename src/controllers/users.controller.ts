import { Controller, Get, Query, Param, Body, Post, Delete, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('')
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return {
      message: `user: limit => ${limit}, offset => ${offset}`,
    };
  }

  @Get(':userId')
  getOrder(@Param('userId') userId: string) {
    return {
      message: `user: ${userId}`,
    };
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
      // message: `product con id: ${id} eliminado con éxito`
    };
  }
}
