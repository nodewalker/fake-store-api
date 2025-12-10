import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsString,
  Length,
  IsNumber,
  Min,
  IsOptional,
  Max,
  IsArray,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of product ( from 2 to 50 symbols )',
    example: 'New Balance 1906',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  name: string;

  @ApiProperty({
    name: 'price',
    description: 'Price of product ( min 1 )',
    example: 1000,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    name: 'discount',
    description: 'Discount of product ( from 0 to 100 )',
    default: 0,
    example: 25,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  // TODO: check
  @ApiProperty({
    name: 'removeImages',
    description: 'Images to remove',
    example: [
      '17a54659-a06a-464f-a914-190cee7d4b1a',
      '17a54659-a06a-464f-a914-190cee7d4b1a',
    ],
    isArray: true,
    type: String,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  removeImages?: string[];

  @ApiProperty({
    name: 'images',
    type: 'array',
    isArray: true,
    items: { type: 'string', format: 'binary' },
    description: 'Product images',
    minItems: 1,
    maxItems: 3,
  })
  @IsOptional()
  images?: Express.Multer.File[];
}
