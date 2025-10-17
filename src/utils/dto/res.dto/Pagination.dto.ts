import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationDetails {
  @ApiProperty({
    name: 'total',
    description: 'Total items',
    example: 240,
    type: Number,
  })
  @Expose()
  total: number;

  @ApiProperty({
    name: 'page',
    description: 'Current page',
    example: 1,
    type: Number,
  })
  @Expose()
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'Current limit',
    example: 10,
    type: Number,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    name: 'totalPage',
    description: 'Total page count',
    example: 24,
    type: Number,
  })
  @Expose()
  totalPages: number;

  @ApiProperty({
    name: 'isLastPage',
    description: 'is last page?',
    example: false,
    type: Boolean,
  })
  @Expose()
  isLastPage: boolean;
}
