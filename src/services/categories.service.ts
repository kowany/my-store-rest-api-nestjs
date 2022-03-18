import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/category.dtos';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      id: 1,
      name: 'laptops',
    },
  ];

  getAll() {
    return this.categories;
  }

  getOne(id: number) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    this.counterId = this.counterId + 1;
    const newCategory = {
      id: this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.getOne(id);
    if (category) {
      const index = this.categories.findIndex( (category) => category.id === id);
      this.categories[index] = {
        ...category,
        ...payload,
      };
      return this.categories[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    this.categories.splice(index, 1);
    return true;
  }
}
