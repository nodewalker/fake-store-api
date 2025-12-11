import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user';
import { UserCartItemEntity } from './userCartItem';

@Entity({ name: 'user_cart' })
export class UserCartEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  _uuid: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @OneToMany(() => UserCartItemEntity, (item) => item.cart)
  products: UserCartItemEntity[];
}
