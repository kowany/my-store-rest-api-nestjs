import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('')
  getBrands(@Query('limit') limit = 100, @Query('offset') offset = 0) {
    return `brands: limit => ${limit}, offset => ${offset}`;
  }

  @Get(':brandId')
  getOne(@Param('brandId') brandId: string) {
    return {
      brandId,
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
    };
  }
}
