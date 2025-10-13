import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/const';
import { ICategoryService } from 'src/utils/interfaces';
import { IProductService } from 'src/utils/interfaces/IProductService';
import { ProductEntity, ProductImageEntity } from 'src/utils/typeorm';
import {
  CreateProductDetails,
  GetProductsDetails,
  GetProductsReturn,
} from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageEntity: Repository<ProductImageEntity>,
    @Inject(Services.category)
    private readonly categoryService: ICategoryService,
  ) {}

  async createProduct(
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductEntity> {
    try {
      const category = await this.categoryService.getCategoryById(
        details.categoryId,
        true,
      );
      const product: ProductEntity = await this.productRepository.save({
        name: details.name,
        price: details.price,
        discount: details?.discount,
        category,
        user: { _uuid: userId },
      });
      for (let i = 0; i < details.images.length; i++)
        await this.productImageEntity.save({
          product,
          _uuid: details.images[i],
        });

      // TODO:
      return (await this.productRepository
        .createQueryBuilder('product')
        .where('product._uuid = :uuid', { uuid: product._uuid })
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.category', 'category')
        .getOne()) as ProductEntity;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO: 
  async getProducts(details: GetProductsDetails): Promise<GetProductsReturn> {
    try {
      const qb = this.productRepository
        .createQueryBuilder('product')
        .take(details.limit)
        .offset((details.page - 1) * details.limit)
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.images', 'images');
      if (details.name)
        qb.andWhere('product.name LIKE :name', { name: details.name });
      if (details.categoryName)
        qb.andWhere('product.category.name = :name', {
          name: details.categoryName,
        });
      if (details.orderBy && details.sortBy)
        qb.orderBy(`product.${details.orderBy}`, details.sortBy);
      if (details.priceFrom)
        qb.andWhere('product.price >= :pfrom', { pfrom: details.priceFrom });
      if (details.priceTo)
        qb.andWhere('product.price <= :pto', { pfrom: details.priceTo });
      const [data, total]: [ProductEntity[], number] =
        await qb.getManyAndCount();
      return {
        data,
        pagination: {
          total,
          page: details.page,
          limit: details.limit,
          totalPages: Math.ceil(total / details.limit),
          isLastPage: details.page >= Math.ceil(total / details.limit),
        },
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const product: ProductEntity | null = await this.productRepository
        .createQueryBuilder('product')
        .where('product._uuid = :uuid', { uuid: id })
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.images', 'images')
        .getOne();
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return product;
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
