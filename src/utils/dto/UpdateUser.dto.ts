import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  avatarURL: string;
}
