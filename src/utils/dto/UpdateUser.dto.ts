import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  // TODO: MULTER
  @IsString()
  @IsOptional()
  avatarURL?: string;
}
