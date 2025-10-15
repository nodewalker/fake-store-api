import { Expose } from 'class-transformer';
import { CategoryDetails } from './Caregory.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDetails } from './Pagination.dto';

export class RootCategoriesDetail {
  @ApiProperty({
    name: 'tree',
    description: 'Root categories tree',
    isArray: true,
    type: CategoryDetails,
  })
  @Expose()
  tree: CategoryDetails[];

  @ApiProperty({
    name: 'pagination',
    description: 'Paggination info',
    type: PaginationDetails,
  })
  @Expose()
  pagination: PaginationDetails;
}
