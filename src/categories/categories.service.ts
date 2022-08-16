import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dtos/categories.dto';
import { ICategory } from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<ICategory>,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<ICategory> {
    const { category } = categoryData;
    const foundCategory = await this.categoryModel.findOne({ category }).exec();

    if (foundCategory)
      throw new BadRequestException(`Category ${category} already exists!`);

    const categoryToCreate = new this.categoryModel(categoryData);
    return await categoryToCreate.save();
  }

  async listCategories(): Promise<ICategory[]> {
    return await this.categoryModel.find();
  }

  async getCategory(category: string): Promise<ICategory> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    if (!foundCategory)
      throw new NotFoundException(`Category ${category} not found!`);
    return foundCategory;
  }

  private async categoryExist(_id: string) {
    return _id;
  }
}
