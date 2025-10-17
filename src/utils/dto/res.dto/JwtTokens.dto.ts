import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtTokensDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'User id for jwt payload',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;
}
