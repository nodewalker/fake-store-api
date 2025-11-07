import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class SelectCartItemDto {
  @ApiProperty({
    name: 'selected',
    description: 'Selected cart item _uuid',
    example: [
      '17a54659-a06a-464f-a914-190cee7d4b1a',
      '17a54659-a06a-464f-a914-190cee7d4b1a',
    ],
    isArray: true,
    type: String,
    required: true,
  })
  @IsArray()
  @IsString({ each: true })
  selected: string[];
}
