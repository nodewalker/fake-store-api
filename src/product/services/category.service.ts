import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/utils/Config';
import { Services } from 'src/utils/const';
import { ICategoryService, IUserService } from 'src/utils/interfaces';
import { ProductCategoryEntity } from 'src/utils/typeorm';
import {
  CreateCategoryDetails,
  GetCategoriesReturn,
  PaginationDetails,
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
      let parentCategory: ProductCategoryEntity | null = null;
      if (details.parentId)
        parentCategory = await this.categoryRepository
          .createQueryBuilder('category')
          .where('category._uuid = :uuid', { uuid: details.parentId })
          .leftJoinAndSelect('category.parent', 'parent')
          .leftJoinAndSelect('category.children', 'children')
          .leftJoinAndSelect('category.products', 'products')
          .getOne();

      // OK
      if (parentCategory?._uuid) {
        // Check name
        parentCategory?.children.forEach((children) => {
          if (children.name === details.name)
            throw new HttpException(
              'The name of the category is already taken',
              HttpStatus.BAD_REQUEST,
            );
        });

        // Check is product exist
        if (parentCategory.products.length)
          throw new HttpException(
            'The parent category contains products',
            HttpStatus.BAD_REQUEST,
          );

        // check depth
        const depth: number = await this.getCategoryDepth(parentCategory);
        if (depth + 1 >= Config.CATEGORY.MAX_DEEP)
          throw new HttpException(
            `Cannot create subcategory deeper than level ${Config.CATEGORY.MAX_DEEP}`,
            HttpStatus.BAD_REQUEST,
          );

        // check children length
        if (parentCategory.children.length >= Config.CATEGORY.MAX_CHILDREN)
          throw new HttpException(
            `Cannot have more than ${Config.CATEGORY.MAX_CHILDREN} subcategories`,
            HttpStatus.BAD_REQUEST,
          );
      } else {
        // Check name
        const categoryExist: ProductCategoryEntity | null =
          await this.categoryRepository
            .createQueryBuilder('category')
            .leftJoin('category.parent', 'parent')
            .where('parent._uuid IS NULL')
            .andWhere('category.name = :name', { name: details.name })
            .getOne();
        if (categoryExist)
          throw new HttpException(
            'The name of the parent category is already taken',
            HttpStatus.CONFLICT,
          );
      }

      const user: ReturnUserDetails = (await this.userService.findOne(
        userId,
        false,
      )) as ReturnUserDetails;
      if (parentCategory?._uuid)
        await this.categoryRepository.save({
          name: details.name,
          user: user,
          parent: parentCategory,
        });
      else
        await this.categoryRepository.save({
          name: details.name,
          user: user,
        });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getCategoryDepth(
    category: ProductCategoryEntity,
  ): Promise<number> {
    let depth = 0;
    let current: ProductCategoryEntity | null = category;
    while (current?.parent) {
      depth++;
      current = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category._uuid = :uuid', { uuid: current.parent._uuid })
        .leftJoinAndSelect('category.parent', 'parent')
        .getOne();
    }
    return depth;
  }

  async getAllCategories(
    details: PaginationDetails,
  ): Promise<GetCategoriesReturn> {
    try {
      const categories: ProductCategoryEntity[] = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.parent', 'parent')
        .getMany();

      const categoryMap = new Map<
        string,
        ProductCategoryEntity & { children: ProductCategoryEntity[] }
      >();

      categories.forEach((cat) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { parent, ...rest } = cat;
        categoryMap.set(cat._uuid, { ...rest, children: [] });
      });

      const tree: ProductCategoryEntity[] = [];
      categoryMap.forEach((cat) => {
        const originalCat = categories.find((c) => c._uuid === cat._uuid);
        if (originalCat?.parent) {
          const parent = categoryMap.get(originalCat.parent._uuid);
          parent?.children.push(cat);
        } else {
          tree.push(cat);
        }
      });

      const offset = (details.page - 1) * details.limit;
      const paginatedTree = tree.slice(offset, offset + details.limit);

      return {
        tree: paginatedTree,
        total: tree.length,
        page: details.page,
        limit: details.limit,
        lastPage: Math.ceil(tree.length / details.limit),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
