import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of product ( from 2 to 50 symbols )',
    example: 'New Balance 1906',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'Price of product ( min 1 )',
    example: 1000,
    required: true,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    name: 'categoryId',
    description: 'Category id',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    name: 'discount',
    description: 'Discount of product ( from 0 to 100 )',
    default: 0,
    example: 25,
    required: true,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @ApiProperty({
    name: 'images',
    type: 'array',
    isArray: true,
    items: { type: 'string', format: 'binary' },
    description: 'Product images',
    minItems: 1,
    maxItems: 3,
  })
  images?: Express.Multer.File[];
}
