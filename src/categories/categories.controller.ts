import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/categories.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryData);
  }

  @Get()
  async listCategories() {
    return this.categoryService.listCategories();
  }

  @Get('/:category')
  async getCategory(@Param('category') category: string) {
    return this.categoryService.getCategory(category);
  }

  @Put('/:category')
  async updateCategory(
    @Param('category') category: string,
    @Body() categoryData: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(category, categoryData);
  }
}
