import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    name: 'limit',
    description: 'Items limit on page ( from 1 to 50 )',
    type: Number,
    default: 10,
    example: 15,
    required: false,
  })
  @Expose({ name: 'l' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) =>
    value === undefined || value === '' ? 10 : Number(value),
  )
  @Min(1)
  @Max(50)
  limit: number;

  @ApiProperty({
    name: 'page',
    description: 'Items page ( min 1 )',
    type: Number,
    default: 1,
    example: 2,
    required: false,
  })
  @Expose({ name: 'p' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Transform(({ value }) =>
    value === undefined || value === '' ? 1 : Number(value),
  )
  @Min(1)
  page: number;
}
