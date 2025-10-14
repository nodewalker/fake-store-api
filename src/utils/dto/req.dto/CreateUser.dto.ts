import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(3, 24)
  login: string;

  @Transform(({ value }: { value: string }) => value?.trim())
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  password: string;
}
