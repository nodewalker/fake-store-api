import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
  @ApiProperty({
    name: 'currentPassword',
    description: 'User old password ( from 8 to 32 symbols )',
    example: '**********',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  currentPassword: string;

  @ApiProperty({
    name: 'newPassword',
    description: 'User new password ( from 8 to 32 symbols )',
    example: '**********',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  newPassword: string;

  @ApiProperty({
    name: 'repeatNewPassword',
    description: 'Repeat new password ( from 8 to 32 symbols )',
    example: '**********',
    required: true,
  })
  @IsString()
  @Transform(({ value }: { value: string }) => value?.trim())
  @Length(8, 32)
  repeatNewPassword: string;
}
