import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensDetails {
  @ApiProperty({
    name: 'access_token',
    description: 'access token',
    type: String,
  })
  @Expose()
  access_token: string;

  @ApiProperty({
    name: 'refresh_token',
    description: 'refresh token',
    type: String,
  })
  @Expose()
  refresh_token: string;
}
