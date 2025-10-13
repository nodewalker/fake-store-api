import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProductService } from 'src/utils/interfaces/IProductService';
import { ProductEntity, ProductImageEntity } from 'src/utils/typeorm';
import { GetProductsReturn } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageEntity: Repository<ProductImageEntity>,
  ) {}

  async getProducts(
    limit: number,
    page: number,
    categoryName?: string,
  ): Promise<GetProductsReturn> {
    try {
      const [data, total]: [ProductEntity[], number] =
        await this.productRepository.findAndCount({
          where: { category: { name: categoryName } },
          take: limit,
          skip: (page - 1) * limit,
          relations: ['category', 'images'],
        });
      return {
        data,
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const product: ProductEntity | null =
        await this.productRepository.findOne({
          where: { _uuid: id },
          relations: ['category', 'images'],
        });
      if (!product)
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      return product;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
