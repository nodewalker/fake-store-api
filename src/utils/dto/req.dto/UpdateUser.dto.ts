import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    name: 'firstName',
    description: 'User first name ( from 1 to 20 symbols )',
    example: 'Evgeny',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  @Length(1, 20)
  firstName?: string;

  @ApiProperty({
    name: 'lastName',
    description: 'User last name ( from 1 to 20 symbols )',
    example: 'Smirnov',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  @Length(1, 20)
  lastName?: string;

  @ApiProperty({
    name: 'login',
    description: 'User login ( from 3 to 24 symbols )',
    example: 'nodewalker',
    required: false,
  })
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(3, 24)
  login?: string;

  @ApiProperty({
    name: 'email',
    description: 'User email',
    example: 'nodewalker@yandex.com',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsEmail()
  email?: string;

  @ApiProperty({
    name: 'avatar',
    type: 'string',
    format: 'binary',
    description: 'User avatar',
    required: false,
  })
  avatar?: any;
}
