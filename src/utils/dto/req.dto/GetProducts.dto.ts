import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { OrderBy, SortType } from '../../const';
import { Expose, Transform, Type } from 'class-transformer';

export class GetProductsDto {
  @Expose({ name: 'n' })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  name?: string;

  @Expose({ name: 'orderBy' })
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @Expose({ name: 'sort' })
  @IsOptional()
  @IsEnum(SortType)
  sort?: SortType;

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
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  categoryName?: string;
}
