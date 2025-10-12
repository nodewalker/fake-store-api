import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @Length(8, 32)
  currentPassword: string;

  @IsString()
  @Length(8, 32)
  newPassword: string;

  @IsString()
  @Length(8, 32)
  repeatNewPassword: string;
}
