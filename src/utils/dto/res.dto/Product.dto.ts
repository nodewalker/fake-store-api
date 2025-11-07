import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProductCategoryEntity, ProductImageEntity } from 'src/utils/typeorm';
import { ProductCategoryDetails } from './ProductCategory.dto';

export class ProductDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'Product id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'name',
    description: 'Product name',
    example: 'Nike',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'Product price',
    example: 250,
    type: String,
  })
  @Expose()
  price: number;

  @ApiProperty({
    name: 'discount',
    description: 'Product discount',
    example: 15,
    type: String,
  })
  @Expose()
  discount: number;

  @ApiProperty({
    name: 'images',
    description: 'Product images ( /files/products/:id for get product image )',
    isArray: true,
    type: ProductImageEntity,
  })
  @Expose()
  images?: ProductImageEntity[];

  @ApiProperty({
    name: 'rating',
    description: 'Product rating',
    type: Number,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    name: 'review_count',
    description: 'Product review count',
    type: Number,
  })
  @Expose()
  review_count: number;

  @ApiProperty({
    name: 'category',
    description: 'Product category',
    type: ProductCategoryDetails,
  })
  @Expose()
  category: ProductCategoryEntity;
}
