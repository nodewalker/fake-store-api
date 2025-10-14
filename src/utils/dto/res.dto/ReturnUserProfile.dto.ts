import { Expose } from 'class-transformer';

export class ReturnUserProfileDetails {
  @Expose()
  _uuid: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  login: string;

  @Expose()
  email: string;

  @Expose()
  avatarURL: string;
}
