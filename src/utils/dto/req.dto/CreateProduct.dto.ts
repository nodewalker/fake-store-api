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
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  price: number;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUUID()
  categoryId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;
}
