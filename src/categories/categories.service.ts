import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos/categories.dto';
import {
  IAddPlayerToCategory,
  ICategory,
} from './interfaces/categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<ICategory>,
    private readonly playerService: PlayersService,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<ICategory> {
    const { category } = categoryData;
    const foundCategory = await this.categoryModel.findOne({ category }).exec();

    if (foundCategory)
      throw new BadRequestException(`Category ${category} already exists!`);

    const categoryToCreate = new this.categoryModel(categoryData);
    return await categoryToCreate.save();
  }

  async addPlayerCategory(params: IAddPlayerToCategory): Promise<void> {
    const { category, idPlayer } = params;

    const categoryToUpdate = await this.getCategory(category);
    await this.playerService.getPlayer(idPlayer);
    const playerOnGivenCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(idPlayer)
      .exec();

    if (playerOnGivenCategory.length)
      throw new ConflictException(
        `Player with id: ${idPlayer} is already in this category.`,
      );

    categoryToUpdate.players.push(idPlayer);
    await this.updateCategory(category, categoryToUpdate);
  }

  async listCategories(): Promise<ICategory[]> {
    return await this.categoryModel.find().populate('players').exec();
  }

  async getCategory(category: string): Promise<ICategory> {
    const foundCategory = await this.categoryModel.findOne({ category }).exec();
    if (!foundCategory)
      throw new NotFoundException(`Category ${category} not found!`);
    return foundCategory;
  }

  async getCategoryByPlayerId(playerId: string): Promise<ICategory[]> {
    const foundCategory = await this.categoryModel
      .find()
      .where('players')
      .in([playerId])
      .exec();

    if (!foundCategory.length)
      throw new BadRequestException(
        `Player with id: ${playerId} don't have a category.`,
      );
    return foundCategory;
  }

  async updateCategory(
    category: string,
    categoryData: UpdateCategoryDto,
  ): Promise<ICategory> {
    await this.categoryExist(category);

    try {
      return await this.categoryModel
        .findOneAndUpdate({ category }, { $set: categoryData }, { new: true })
        .exec();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(`An error occour during the update!`);
    }
  }

  private async categoryExist(category: string) {
    const result = await this.categoryModel.count({ category }).exec();
    if (!result) throw new NotFoundException(`Category ${category} not found!`);
  }
}
