import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUUID()
  parentId?: string;
}
