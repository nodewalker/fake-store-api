import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class UpdateCategoryDto {
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
}
