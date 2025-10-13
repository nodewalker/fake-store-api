import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/const';
import { ICategoryService, IUserService } from 'src/utils/interfaces';
import { ProductCategoryEntity } from 'src/utils/typeorm';
import {
  CreateCategoryDetails,
  GetCategoriesReturn,
  ReturnUserDetails,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private readonly categoryRepository: Repository<ProductCategoryEntity>,
    @Inject(Services.user) private readonly userService: IUserService,
  ) {}

  async createCategory(
    userId: string,
    details: CreateCategoryDetails,
  ): Promise<void> {
    try {
      const categoryExist: ProductCategoryEntity | null =
        await this.categoryRepository
          .createQueryBuilder('category')
          .where('category.name = :name', { name: details.name })
          .getOne();

      if (categoryExist)
        throw new HttpException(
          'The name of the category is already taken',
          HttpStatus.CONFLICT,
        );
      const user: ReturnUserDetails = (await this.userService.findOne(
        userId,
        false,
      )) as ReturnUserDetails;
      await this.categoryRepository.save({
        name: details.name,
        user: user,
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllCategories(
    name: string,
    limit: number,
    page: number,
  ): Promise<GetCategoriesReturn> {
    try {
      const [data, total]: [ProductCategoryEntity[], number] =
        await this.categoryRepository
          .createQueryBuilder('category')
          .take(limit)
          .offset((page - 1) * limit)
          .where('category.name = :name', { name })
          .getManyAndCount();
      return { data, total, page, limit, lastPage: Math.ceil(total / limit) };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(name: string): Promise<ProductCategoryEntity | null> {
    try {
      return await this.categoryRepository.findOne({ where: { name } });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
