import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { SortType } from '../const';
import { Expose, Transform, Type } from 'class-transformer';

export class GetProductsDto {
  @Expose({ name: 'n' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  name?: string;

  @Expose({ name: 'p' })
  @IsOptional()
  @IsEnum(SortType)
  price?: SortType;

  @Expose({ name: 'disc' })
  @IsOptional()
  @IsEnum(SortType)
  discount?: SortType;

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
