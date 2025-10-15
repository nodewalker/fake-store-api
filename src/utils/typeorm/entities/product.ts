import { UserCartEntity } from './userCart';
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

  @OneToMany(() => ProductImageEntity, (img) => img.product, {
    onDelete: 'CASCADE',
  })
  images?: ProductImageEntity[];

  @ManyToOne(() => UserCartEntity, (cart) => cart.products)
  carts?: UserCartEntity[];

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  category?: ProductCategoryEntity;

  @ManyToOne(() => UserEntity, (user) => user.products)
  user?: UserEntity;
}
