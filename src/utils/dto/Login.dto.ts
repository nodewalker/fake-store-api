import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
