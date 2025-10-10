import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  login: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
