import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    name: 'name',
    description: 'Name of category ( from 2 to 50 symbols )',
    example: 'Shoes',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  name: string;

  @ApiProperty({
    name: 'parentId',
    description: 'Parent category id',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsUUID()
  parentId?: string;
}
