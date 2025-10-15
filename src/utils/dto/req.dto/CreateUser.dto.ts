import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'firstName',
    description: 'User first name ( from 1 to 20 symbols )',
    example: 'Evgeny',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  @Length(1, 20)
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    description: 'User last name ( from 1 to 20 symbols )',
    example: 'Smirnov',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  @Length(1, 20)
  lastName: string;

  @ApiProperty({
    name: 'login',
    description: 'User login ( from 3 to 24 symbols )',
    example: 'nodewalker',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(3, 24)
  login: string;

  @ApiProperty({
    name: 'email',
    description: 'User email',
    example: 'nodewalker@yandex.com',
    required: true,
  })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsEmail()
  email: string;

  @ApiProperty({
    name: 'password',
    description: 'User password ( from 8 to 32 symbols )',
    example: '**********',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  password: string;
}
