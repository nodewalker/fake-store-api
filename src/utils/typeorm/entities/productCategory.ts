import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from './product';
import { UserEntity } from './user';

@Entity({ name: 'product_category' })
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user: UserEntity;
}
