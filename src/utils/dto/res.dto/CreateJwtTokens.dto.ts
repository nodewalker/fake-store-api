import { Expose } from 'class-transformer';

export class CreateJwtTokensDetails {
  @Expose()
  _uuid: string;
}
