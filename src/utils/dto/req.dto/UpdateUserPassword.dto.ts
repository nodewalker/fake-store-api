import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  currentPassword: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  newPassword: string;

  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  repeatNewPassword: string;
}
