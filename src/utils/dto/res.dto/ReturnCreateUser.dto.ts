import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnCreateUserDetails {
  @ApiProperty({
    name: '_uuid',
    description: 'User id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;
}
