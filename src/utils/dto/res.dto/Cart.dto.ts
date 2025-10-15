import { Expose } from 'class-transformer';
import { ProductDetails } from './Product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CartDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'Cart id',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'products',
    description: 'Products from cart',
    isArray: true,
    type: ProductDetails,
  })
  @Expose()
  products: ProductDetails[];
}
