import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ProductCategoryDetails {
  @ApiProperty({
    name: '_uuid',
    description: 'Category id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'name',
    description: 'Category name',
    example: 'Shoes',
    type: String,
  })
  @Expose()
  name: string;
}
