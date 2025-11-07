import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ReviewUserDetails } from './ReviewUser.dto';

export class ReviewDetails {
  @ApiProperty({
    name: '_uuid',
    description: 'Review d',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'content',
    description: 'Content of review',
    example: 'Best shoes',
    type: String,
  })
  @Expose()
  content: string;

  @ApiProperty({
    name: 'rating',
    description: 'Reting of product (1-5)',
    example: 5,
    type: String,
  })
  @Expose()
  rating: number;

  @ApiProperty({
    name: 'user',
    description: 'Review owner info',
    example: {},
    type: ReviewUserDetails,
  })
  @Expose()
  @Type(() => ReviewUserDetails)
  user: ReviewUserDetails;
}
