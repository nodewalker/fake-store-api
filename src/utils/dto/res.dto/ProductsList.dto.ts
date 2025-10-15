import { ProductDetails } from './Product.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDetails } from './Pagination.dto';

export class ProductsListDetails {
  @ApiProperty({
    name: 'data',
    description: 'Product list',
    isArray: true,
    type: ProductDetails,
  })
  @Expose()
  data: ProductDetails[];

  @ApiProperty({
    name: 'pagintaion',
    description: 'Paggination info',
    type: PaginationDetails,
  })
  @Expose()
  pagination: PaginationDetails;
}
