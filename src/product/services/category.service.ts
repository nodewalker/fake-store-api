import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/utils/Config';
import { Services } from 'src/utils/const';
import { ICategoryService, IUserService } from 'src/utils/interfaces';
import { ProductCategoryEntity, UserEntity } from 'src/utils/typeorm';
import {
  CreateCategoryDetails,
  GetCategoriesReturn,
  PaginationDetails,
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
    let parentCategory: ProductCategoryEntity | null = null;
    if (details.parentId) {
      parentCategory = await this.categoryRepository
        .createQueryBuilder('category')
        .where('category._uuid = :uuid', { uuid: details.parentId })
        .leftJoinAndSelect('category.parent', 'parent')
        .leftJoinAndSelect('category.children', 'children')
        .leftJoinAndSelect('category.products', 'products')
        .getOne();
      if (!parentCategory?._uuid)
        throw new HttpException(
          'Parent category not found',
          HttpStatus.NOT_FOUND,
        );
      if (!parentCategory.isEditable)
        throw new HttpException(
          'You cannot create a subcategory for this category',
          HttpStatus.FORBIDDEN,
        );
    }

    // OK
    if (parentCategory?._uuid) {
      // Check name
      parentCategory.children?.forEach((children) => {
        if (children.name === details.name)
          throw new HttpException(
            'The name of the category is already taken',
            HttpStatus.BAD_REQUEST,
          );
      });

      // Check is product exist
      if (parentCategory.products?.length)
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
      if (parentCategory?.children!.length >= Config.CATEGORY.MAX_CHILDREN)
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
      if (categoryExist?._uuid)
        throw new HttpException(
          'The name of the root category is already taken',
          HttpStatus.BAD_REQUEST,
        );
    }
    // TODO: check auth user is null
    // 🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃🙃
    const user: UserEntity | null = await this.userService.findOne(userId);
    if (!user?._uuid)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

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

  async getRootCategories(
    details: PaginationDetails,
  ): Promise<GetCategoriesReturn> {
    const [categories, total] = await Promise.all([
      this.categoryRepository
        .createQueryBuilder('category')
        .where('category.parent._uuid IS NULL')
        .select(['category._uuid', 'category.name'])
        .addSelect((subQuery) => {
          return subQuery
            .select('COUNT(*) > 0', 'hasChildren')
            .from(ProductCategoryEntity, 'child')
            .where('child.parent._uuid = category._uuid');
        }, 'hasChildren')
        .orderBy('category.name', 'ASC')
        .offset((details.page - 1) * details.limit)
        .limit(details.limit)
        .getRawMany(),
      this.categoryRepository
        .createQueryBuilder('category')
        .where('category.parent IS NULL')
        .getCount(),
    ]);
    return {
      tree: categories.map((cat) => ({
        _uuid: cat.category__uuid,
        name: cat.category_name,
        hasChildren: cat.hasChildren,
      })),
      pagination: {
        total,
        page: details.page,
        limit: details.limit,
        totalPages: Math.ceil(total / details.limit),
        isLastPage: details.page >= Math.ceil(total / details.limit),
      },
    };
  }

  async getChildrenByParentId(uuid: string): Promise<ProductCategoryEntity[]> {
    const parentCategory: ProductCategoryEntity | null =
      await this.categoryRepository
        .createQueryBuilder('category')
        .where('category._uuid = :uuid', { uuid })
        .getOne();
    if (!parentCategory?._uuid)
      throw new HttpException(
        'Parent category not found',
        HttpStatus.NOT_FOUND,
      );
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .select(['category._uuid', 'category.name'])
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(*) > 0', 'hasChildren')
          .from(ProductCategoryEntity, 'child')
          .where('child.parent._uuid = category._uuid');
      }, 'hasChildren')
      .where('category.parent._uuid = :parentId', {
        parentId: parentCategory._uuid,
      })
      .getRawMany();

    return categories.map((cat) => ({
      _uuid: cat.category__uuid,
      name: cat.category_name,
      hasChildren: cat.hasChildren,
    }));
  }

  async getCategoryById(
    uuid: string,
    isCanCreateProduct: boolean,
  ): Promise<ProductCategoryEntity> {
    const category: ProductCategoryEntity | null = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category._uuid = :uuid', { uuid })
      .leftJoinAndSelect('category.children', 'children')
      .getOne();
    if (!category?._uuid)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    if (category.children?.length && isCanCreateProduct)
      throw new HttpException(
        'Subcategories exist. Only create products in categories that do not have subcategories',
        HttpStatus.BAD_REQUEST,
      );
    return category;
  }

  async removeCategory(
    categoryId: string,
    isRemoveAll: boolean,
  ): Promise<void> {
    const category: ProductCategoryEntity | null = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category._uuid = :uuid', { uuid: categoryId })
      .leftJoinAndSelect('category.products', 'products')
      .leftJoinAndSelect('category.children', 'children')
      .getOne();
    if (!category?.isEditable)
      throw new HttpException(
        'You cannot remove this category',
        HttpStatus.FORBIDDEN,
      );
    if (!category?._uuid)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    if (
      !isRemoveAll &&
      (category.children?.length || category.products?.length)
    )
      throw new HttpException(
        'The category has products or subcategories',
        HttpStatus.BAD_REQUEST,
      );
    await this.categoryRepository.remove(category);
  }
}
