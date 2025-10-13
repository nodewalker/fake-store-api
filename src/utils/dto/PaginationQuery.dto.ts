import { Expose, Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class PaginationQueryDto {
  @Expose({ name: 'l' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit: number = 10;

  @Expose({ name: 'p' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number = 1;
}
