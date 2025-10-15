import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReturnUserProfileDetails {
  @ApiProperty({
    name: 'uuid',
    description: 'User id',
    type: String,
  })
  @Expose()
  _uuid: string;

  @ApiProperty({
    name: 'firstName',
    description: 'User first name',
    type: String,
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    description: 'User last name',
    type: String,
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    name: 'login',
    description: 'User login',
    type: String,
  })
  @Expose()
  login: string;

  @ApiProperty({
    name: 'email',
    description: 'User email',
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    name: 'avatarURL',
    description: 'User avatar url',
    type: String,
  })
  @Expose()
  avatarURL: string;
}
