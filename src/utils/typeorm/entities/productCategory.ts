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

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category, {
    onDelete: 'CASCADE',
  })
  products?: ProductEntity[];

  @ManyToOne(() => UserEntity, (user) => user.categories)
  user?: UserEntity;

  @ManyToOne(() => ProductCategoryEntity, (category) => category.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent?: ProductCategoryEntity;

  @OneToMany(() => ProductCategoryEntity, (category) => category.parent, {
    onDelete: 'CASCADE',
  })
  children?: ProductCategoryEntity[];
}
