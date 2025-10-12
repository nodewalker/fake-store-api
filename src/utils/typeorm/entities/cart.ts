import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user';
import { ProductEntity } from './product';

@Entity({ name: 'user_cart' })
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @OneToOne(() => UserEntity, (user) => user.cart)
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.carts, {
    cascade: true,
  })
  @JoinTable({
    name: 'carts_products',
    joinColumn: { name: 'cart_uuid', referencedColumnName: '_uuid' },
    inverseJoinColumn: { name: 'product_uuid', referencedColumnName: '_uuid' },
  })
  products: ProductEntity[];
}
