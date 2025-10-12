import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product';

@Entity({ name: 'product_image' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
