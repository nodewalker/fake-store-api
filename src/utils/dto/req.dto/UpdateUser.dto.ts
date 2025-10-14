import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  firstName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsNotEmpty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(3, 24)
  login?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsEmail()
  email?: string;
}
