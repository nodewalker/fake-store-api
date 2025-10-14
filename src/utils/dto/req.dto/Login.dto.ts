import { IsString, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(3)
  login: string;

  @IsString()
  @Length(8, 32)
  password: string;
}
