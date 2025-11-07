import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDetails } from './Pagination.dto';
import { ReviewDetails } from './Review.dto';

export class ReviewListDetails {
  @ApiProperty({
    name: 'data',
    description: 'Review list',
    isArray: true,
    type: ReviewDetails,
  })
  @Expose()
  data: ReviewDetails[];

  @ApiProperty({
    name: 'pagintaion',
    description: 'Paggination info',
    type: PaginationDetails,
  })
  @Expose()
  pagination: PaginationDetails;
}
