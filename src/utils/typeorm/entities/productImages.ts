import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'product_image' })
export class ProductImageEntity {
  @ApiProperty({
    name: '_uuid',
    description: 'Image url',
    type: String,
  })
  @Expose()
  @PrimaryColumn({ unique: true })
  _uuid: string;

  @Exclude()
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
