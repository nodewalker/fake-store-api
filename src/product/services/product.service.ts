import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Services } from 'src/utils/const';
import { ICategoryService } from 'src/utils/interfaces';
import { IProductService } from 'src/utils/interfaces/IProductService';
import { ProductEntity, ProductImageEntity } from 'src/utils/typeorm';
import { CreateProductDetails, GetProductsDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { plainToInstance } from 'class-transformer';
import { ProductDetails, ProductsListDetails } from 'src/utils/dto';

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
    const category = await this.categoryService.getCategoryById(
      details.categoryId,
      true,
    );
    if (!category.isEditable)
      throw new HttpException(
        'You cannot create a product for this category',
        HttpStatus.FORBIDDEN,
      );
    const product: ProductEntity = await this.productRepository.save({
      name: details.name,
      price: details.price,
      discount: details?.discount,
      category,
      user: { _uuid: userId },
    });
    for (let i = 0; i < details.images.length; i++) {
      await this.productImageEntity.save({
        product,
        _uuid: details.images[i],
      });
    }
    return plainToInstance(
      ProductDetails,
      (await this.productRepository
        .createQueryBuilder('product')
        .where('product._uuid = :uuid', { uuid: product._uuid })
        .leftJoinAndSelect('product.images', 'images')
        .leftJoinAndSelect('product.category', 'category')
        .getOne()) as ProductEntity,
      { excludeExtraneousValues: true },
    );
  }

  // TODO: category id men's: {shoes, jeans} => get shoes and jeans by men's category id
  async getProducts(details: GetProductsDetails): Promise<ProductsListDetails> {
    console.log(details);
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images');
    if (details.name) {
      const names = details.name?.split(' ');
      names.forEach((name, index) =>
        qb.andWhere(`product.name ILIKE :name${index}`, {
          [`name${index}`]: `%${name}%`,
        }),
      );
    }
    if (details.categoryName) {
      const categoryName = details.categoryName.split(' ');
      categoryName.forEach((cn, index) =>
        qb.andWhere(`category.name ILIKE :name${index}`, {
          [`name${index}`]: `%${cn}%`,
        }),
      );
    }
    if (details.categoryId)
      qb.andWhere('category._uuid = :uuid', { uuid: details.categoryId });
    if (details.priceFrom)
      qb.andWhere('product.price >= :pfrom', { pfrom: details.priceFrom });
    if (details.priceTo)
      qb.andWhere('product.price <= :pto', { pto: details.priceTo });
    if (details.orderBy && details.sort)
      qb.orderBy(`product.${details.orderBy}`, details.sort);
    const [data, total]: [ProductEntity[], number] = await qb
      .take(details.limit)
      .skip((details.page - 1) * details.limit)
      .getManyAndCount();

    return plainToInstance(
      ProductsListDetails,
      {
        data,
        pagination: {
          total,
          page: details.page,
          limit: details.limit,
          totalPages: Math.ceil(total / details.limit),
          isLastPage: details.page >= Math.ceil(total / details.limit),
        },
      },
      { excludeExtraneousValues: true },
    );
  }

  async getProductById(id: string): Promise<ProductEntity> {
    const product: ProductEntity | null = await this.productRepository
      .createQueryBuilder('product')
      .where('product._uuid = :uuid', { uuid: id })
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .getOne();
    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    return product;
  }

  async removeProduct(productId: string): Promise<void> {
    const product: ProductEntity = await this.getProductById(productId);
    if (!product.category?.isEditable)
      throw new HttpException(
        'You cannot remove a product from this category',
        HttpStatus.FORBIDDEN,
      );
    const images: ProductImageEntity[] = await this.productImageEntity
      .createQueryBuilder('images')
      .where('images.product._uuid = :uuid', { uuid: product._uuid })
      .getMany();
    images.forEach((im) => {
      fs.unlink(`./uploads/products/${im._uuid}`, (res) => {
        console.log(res);
      });
    });
    await this.productRepository.remove(product);
  }

  async isCategoryhasProducts(categoryId: string): Promise<boolean> {
    const count: number = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.category', 'category')
      .where('category._uuid = :uuid', { uuid: categoryId })
      .getCount();
    return count > 0;
  }
}
