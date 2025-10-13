import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderBy, SortType } from '../const';
import { Expose, Transform, Type } from 'class-transformer';

export class GetProductsDto {
  @Expose({ name: 'n' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  name?: string;

  @Expose({ name: 'orderBy' })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @Expose({ name: 'sortBy' })
  @IsOptional()
  @IsEnum(SortType)
  sortBy?: SortType;

  @Expose({ name: 'pfrom' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceFrom?: number;

  @Expose({ name: 'pto' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  priceTo?: number;

  @Expose({ name: 'cn' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsOptional()
  @IsString()
  categoryName?: string;
}
