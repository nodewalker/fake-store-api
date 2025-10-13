import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product';

@Entity({ name: 'product_image' })
export class ProductImageEntity {
  @PrimaryColumn({ unique: true })
  _uuid: string;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
