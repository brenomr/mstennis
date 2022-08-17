import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/categories.dto';
import { IAddPlayerToCategory } from './interfaces/categories.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return this.categoryService.createCategory(categoryData);
  }

  @Post('/:category/players/:idPlayer')
  async addPlayerCategory(@Param() params: IAddPlayerToCategory) {
    return await this.categoryService.addPlayerCategory(params);
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
