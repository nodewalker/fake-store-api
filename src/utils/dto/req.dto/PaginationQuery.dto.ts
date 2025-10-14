import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, Min, Max, IsNumber } from 'class-validator';

export class PaginationQueryDto {
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
