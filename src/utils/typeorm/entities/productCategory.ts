import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product';

@Entity({ name: 'product_category' })
export class ProductCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column()
  name: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: ProductEntity[];
}
