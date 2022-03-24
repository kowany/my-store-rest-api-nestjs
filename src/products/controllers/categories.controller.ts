import { CategoriesService } from '../services/categories.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('')
  getCategories() {
    return this.categoriesService.getAll();
  }

  @Get(':categoryId')
  getCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.getOne(+categoryId);
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoriesService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
