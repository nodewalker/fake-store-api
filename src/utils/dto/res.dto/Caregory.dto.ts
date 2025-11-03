import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDetails {
  @ApiProperty({
    name: 'uuid',
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

  @ApiProperty({
    name: 'Childrens',
    description: 'Field for retrieve subcategories at all level',
    required: false,
    isArray: true,
    type: CategoryDetails,
  })
  @Expose()
  children?: CategoryDetails[];

  @ApiProperty({
    name: 'hasChildren',
    description: 'Is category has children',
    example: true,
    type: Boolean,
    required: false,
  })
  @Expose()
  hasChildren: boolean;

  @ApiProperty({
    name: 'hasProduct',
    description: 'Is category has product',
    example: false,
    type: Boolean,
    required: false,
  })
  @Expose()
  hasProduct: boolean;
}
