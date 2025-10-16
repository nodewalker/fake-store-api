import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ProductImageEntity } from 'src/utils/typeorm';

export class ProductCategoryDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'Category id',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'name',
    description: 'Category name',
    type: String,
  })
  @Expose()
  name: string;
}

export class ProductDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'Product id',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'name',
    description: 'Product name',
    type: String,
  })
  @Expose()
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'Product price',
    type: String,
  })
  @Expose()
  price: number;

  @ApiProperty({
    name: 'discount',
    description: 'Product discount',
    type: String,
  })
  @Expose()
  discount: number;

  @ApiProperty({
    name: 'images',
    description: 'Product images',
    isArray: true,
    type: ProductImageEntity,
  })
  @Expose()
  images?: ProductImageEntity[];

  @ApiProperty({
    name: 'category',
    description: 'Product category',
    type: ProductCategoryDetails,
  })
  @Expose()
  category?: ProductCategoryDetails;
}
