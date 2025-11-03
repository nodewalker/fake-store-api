import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { OrderBy, SortType } from '../../const';
import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationQueryDto } from './PaginationQuery.dto';

export class GetProductsDto extends PaginationQueryDto {
  @ApiProperty({
    name: 'n',
    description: 'Product name',
    example: 'nike',
    required: false,
  })
  @Expose({ name: 'n' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  name?: string;

  @ApiProperty({
    name: 'orderBy',
    description: 'Sort by ( name, price, discount )',
    example: 'price',
    required: false,
  })
  @Expose({ name: 'orderBy' })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiProperty({
    name: 'sort',
    description: 'Sort method ( ASC | DESC )',
    example: 'ASC',
    required: false,
  })
  @Expose({ name: 'sort' })
  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;

  @ApiProperty({
    name: 'pfrom',
    description: 'Product price from ( min 0 )',
    example: 500,
    required: false,
  })
  @Expose({ name: 'pfrom' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceFrom?: number;

  @ApiProperty({
    name: 'pto',
    description: 'Product price to ( min 1 )',
    example: 1000,
    required: false,
  })
  @Expose({ name: 'pto' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceTo?: number;

  @ApiProperty({
    name: 'cn',
    description: 'Product category name',
    example: 'Shoes',
    required: false,
  })
  @Expose({ name: 'cn' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  categoryName?: string;

  @ApiProperty({
    name: 'cid',
    description: 'Product category id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    required: false,
  })
  @Expose({ name: 'cid' })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUUID()
  categoryId?: string;
}
