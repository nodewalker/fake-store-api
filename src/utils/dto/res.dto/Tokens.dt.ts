import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensDetails {
  @ApiProperty({
    name: 'access_token',
    description: 'access token',
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJzdWIiOiIxN2E1NDY1OS1hMDZhLTQ2NGYtYTkxNC0xOTBjZWU3ZDRiMWEiLCJsb2dpbiI6Im5vZGV3YWxrZXIifQ.4k3a3M1kDJEay6JLsUlwwYtm33xNsnmqRco2Uveyq9M',
    type: String,
  })
  @Expose()
  access_token: string;

  @ApiProperty({
    name: 'refresh_token',
    description: 'refresh token',
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJzdWIiOiIxN2E1NDY1OS1hMDZhLTQ2NGYtYTkxNC0xOTBjZWU3ZDRiMWEiLCJsb2dpbiI6Im5vZGV3YWxrZXIifQ.4k3a3M1kDJEay6JLsUlwwYtm33xNsnmqRco2Uveyq9M',
    type: String,
  })
  @Expose()
  refresh_token: string;
}
