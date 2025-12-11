import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserCartEntity } from './userCart';

@Entity('user_cart_item')
export class UserCartItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  _uuid: string;

  @Column({ name: 'product_uuid' })
  productUuid: string;

  @Column()
  quantity: number;

  @ManyToOne(() => UserCartEntity, (cart) => cart.products)
  cart: UserCartEntity;
}
