import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    name: 'content',
    description: 'Content of review ( from 2 to 50 symbols )',
    example: 'Best shoes',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(2, 50)
  content: string;

  @ApiProperty({
    name: 'rating',
    description: 'Rating of product (1-5)',
    example: 5,
    required: true,
  })
  @IsNumber()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;
}
