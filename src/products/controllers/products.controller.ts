import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseIntPipe } from './../../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ProductsService } from './../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // Los parámetros que vienen de la url por defecto
  // son string
  @Get('')
  @ApiOperation({ summary: `List of products` })
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }
  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  @Get(':productId')
  @ApiOperation({ summary: `Get product with productId` })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @ApiOperation({ summary: `Create product` })
  create(@Body() payload: CreateProductDto) {
    console.log(payload);
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: `Update product with productId` })
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Delete product with productId` })
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
