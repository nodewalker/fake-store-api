import { ProductDetails } from './Product.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDetails } from './Pagination.dto';

export class ProductPriceRangeDetails {
  @ApiProperty({
    name: 'min',
    description: 'Min price length',
    example: 100,
    type: Number,
  })
  @Expose()
  min: number;

  @ApiProperty({
    name: 'max',
    description: 'Max price length',
    example: 5000,
    type: Number,
  })
  @Expose()
  max: number;
}

export class ProductsListDetails {
  @ApiProperty({
    name: 'data',
    description: 'Product list',
    isArray: true,
    type: ProductDetails,
  })
  @Expose()
  @Type(() => ProductDetails)
  data: ProductDetails[];

  @ApiProperty({
    name: 'price_range',
    description: 'Product price range',
    type: ProductPriceRangeDetails,
  })
  @Expose()
  @Type(() => ProductPriceRangeDetails)
  price_range: ProductPriceRangeDetails;

  @ApiProperty({
    name: 'pagintaion',
    description: 'Paggination info',
    type: PaginationDetails,
  })
  @Expose()
  @Type(() => PaginationDetails)
  pagination: PaginationDetails;
}
