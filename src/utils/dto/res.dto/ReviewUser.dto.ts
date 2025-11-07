import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewUserDetails {
  @ApiProperty({
    name: '_uuid',
    description: 'User id',
    example: '17a54659-a06a-464f-a914-190cee7d4b1a',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'firstName',
    description: 'User first name',
    example: 'Evgeny',
    type: String,
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    description: 'User last name',
    example: 'Smirnov',
    type: String,
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    name: 'avatarURL',
    description: 'User avatar url',
    type: String,
  })
  @Expose()
  avatarURL: string;
}
