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

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  discount: number;

  @OneToMany(() => ProductImageEntity, (img) => img.product)
  images: ProductImageEntity[];

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  carts: CartEntity[];

  @ManyToOne(() => ProductCategoryEntity, (category) => category.products)
  category: ProductCategoryEntity;
}
