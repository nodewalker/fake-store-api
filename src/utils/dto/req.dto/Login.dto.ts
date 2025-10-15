import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    name: 'login',
    description: 'User login ( from 3 to 24 symbols )',
    example: 'nodewalker',
    required: true,
  })
  @IsString()
  @Length(3, 24)
  login: string;

  @ApiProperty({
    name: 'password',
    description: 'User password ( from 8 to 32 symbols )',
    example: '**********',
    required: true,
  })
  @IsString()
  @Length(8, 32)
  password: string;
}
