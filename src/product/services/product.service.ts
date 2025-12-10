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
    private readonly productImageRepository: Repository<ProductImageEntity>,
    @Inject(Services.category)
    private readonly categoryService: ICategoryService,
  ) {}

  async createProduct(
    userId: string,
    details: CreateProductDetails,
  ): Promise<ProductDetails> {
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
      await this.productImageRepository.save({
        product,
        _uuid: details.images[i],
      });
    }
    const res: ProductEntity | null = await this.productRepository
      .createQueryBuilder('product')
      .where('product._uuid = :uuid', { uuid: product._uuid })
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.category', 'category')
      .getOne();
    if (!res?._uuid)
      throw new HttpException(
        "Product not found ( don't create ) ",
        HttpStatus.NOT_FOUND,
      );
    return plainToInstance(
      ProductDetails,
      { ...res, rating: 0, review_count: 0 },
      { excludeExtraneousValues: true },
    );
  }

  async getProducts(details: GetProductsDetails): Promise<ProductsListDetails> {
    const qb = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.reviews', 'review');
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
    if (details.categoryId) {
      const categories = await this.categoryService.getSubcategoriesList(
        details.categoryId,
      );
      if (categories.length) {
        categories.forEach((cat, i) => {
          if (cat?._uuid)
            qb.orWhere(`category._uuid = :catid${i}`, {
              [`catid${i}`]: cat._uuid,
            });
        });
      } else
        qb.andWhere('category._uuid = :categoryID', {
          categoryID: details.categoryId,
        });
    }
    if (details.priceFrom)
      qb.andWhere('product.price >= :pfrom', { pfrom: details.priceFrom });
    if (details.priceTo)
      qb.andWhere('product.price <= :pto', { pto: details.priceTo });
    if (details.orderBy && details.sort)
      qb.orderBy(`product.${details.orderBy}`, details.sort);
    const [temp, total]: [ProductEntity[], number] = await qb
      .take(details.limit)
      .skip((details.page - 1) * details.limit)
      .getManyAndCount();
    const priceLength: [number, number] = [
      temp[0]?.price ? temp[0]?.price : 0,
      temp[0]?.price ? temp[0]?.price : 0,
    ];
    const res = temp.map((pr: ProductEntity) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { reviews, ...r } = pr;
      priceLength[0] = Math.min(priceLength[0], pr.price);
      priceLength[1] = Math.max(priceLength[1], pr.price);
      return {
        ...r,
        rating:
          (pr.reviews &&
            Number(
              Number.parseFloat(
                (
                  pr.reviews.reduce((prev, curr) => prev + curr.rating, 0) /
                  pr.reviews.length
                ).toString(),
              ).toFixed(1),
            )) ||
          0,
        review_count: pr.reviews?.length || 0,
      } as ProductDetails;
    });
    return plainToInstance(
      ProductsListDetails,
      {
        data: res,
        price_range: { min: priceLength[0], max: priceLength[1] },
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

  async updateProduct() {}

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
    const images: ProductImageEntity[] = await this.productImageRepository
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
