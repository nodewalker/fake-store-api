import { Expose } from 'class-transformer';
import { ProductDetails } from './Product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CartDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'Cart id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
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
