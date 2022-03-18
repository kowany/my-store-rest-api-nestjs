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
  // Res,
  // ParseIntPipe,
} from '@nestjs/common';

// import { Response } from 'express';
import { ParseIntPipe } from './../common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';
import { ProductsService } from './../services/products.service';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {}

  // Los parámetros que vienen de la url por defecto
  // son string
  @Get('')
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
    // return {
      // message: `products: limit => ${limit}, offset => ${offset}, brand => ${brand} `,
    // };
  }
  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
    // @Res() response: Response, esto va dentro getOne
    // Esta es la forma en que trabaja express
    // response.status(200).send({
    //   message: `product: ${productId}`,
    // });
    // La siguiente manera es la forma en como lo
    // trabaja Nestjs
    // return {
    //   message: `product: ${productId}`,
    // };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    console.log(payload);
    return this.productsService.create(payload);
    // return {
    //   message: 'acción de crear',
    //   payload,
    // };
  }

  // @Put(':id')
  // update(@Param('id') id: number, @Body() payload: any) {
  //   return this.productsService.update(id, payload);
  //   // return {
  //   //   id,
  //   //   payload,
  //   // };
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.remove(+id);
    // return {
    //   id,
    //   // message: `product con id: ${id} eliminado con éxito`
    // };
  }
}
// Los pipes transforman y validad información
// La salida de un pipe puede ser la entrada de otro


// Los Data Transfers Objects (DTO) son objetos que
// permiten tipar y validar cuando uno envía información
// Es buena práctica mantener separados los DTO's y
// los entities
