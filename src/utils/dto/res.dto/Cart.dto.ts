import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CartItemsDetails } from './CartItem.dto';

export class CartDetails {
  @ApiProperty({
    name: '_uuid',
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
    type: CartItemsDetails,
  })
  @Type(() => CartItemsDetails)
  @Expose()
  products: CartItemsDetails[];
}
