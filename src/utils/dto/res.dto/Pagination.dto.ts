import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationDetails {
  @ApiProperty({
    name: 'total',
    description: 'Total items',
    type: Number,
  })
  @Expose()
  total: number;

  @ApiProperty({
    name: 'page',
    description: 'Current page',
    type: Number,
  })
  @Expose()
  page: number;

  @ApiProperty({
    name: 'limit',
    description: 'Current limit',
    type: Number,
  })
  @Expose()
  limit: number;

  @ApiProperty({
    name: 'totalPage',
    description: 'Total page count',
    type: Number,
  })
  @Expose()
  totalPages: number;

  @ApiProperty({
    name: 'isLastPage',
    description: 'is last page?',
    type: Boolean,
  })
  @Expose()
  isLastPage: boolean;
}
