import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtTokensDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'User id for jwt payload',
    type: String,
  })
  @Expose()
  _uuid: string;
}
