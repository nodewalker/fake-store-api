import { CartEntity } from './cart';
import { ProductCategoryEntity } from './productCategory';
import { ProductImageEntity } from './productImages';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  discount: number;

  @OneToMany(() => ProductImageEntity, (img) => img.product, { nullable: true })
  images?: ProductImageEntity[];

  @ManyToOne(() => CartEntity, (cart) => cart.products, { nullable: true })
  carts?: CartEntity[];

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  category?: ProductCategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user?: UserEntity;
}
