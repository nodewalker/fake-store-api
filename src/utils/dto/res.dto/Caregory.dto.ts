import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryDetails {
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

  @ApiProperty({
    name: 'hasChildren',
    description: 'Is category has children',
    type: Boolean,
    required: false,
  })
  @Expose()
  hasChildren: boolean;

  @ApiProperty({
    name: 'hasProduct',
    description: 'Is category has product',
    type: Boolean,
    required: false,
  })
  @Expose()
  hasProduct: boolean;
}
