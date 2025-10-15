import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductEntity } from './product';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'product_image' })
export class ProductImageEntity {
  @ApiProperty({
    name: 'uuid',
    description: 'Image url',
    type: String,
  })
  @PrimaryColumn({ unique: true })
  _uuid: string;

  @Exclude()
  @ManyToOne(() => ProductEntity, (product) => product.images, {
    onDelete: 'CASCADE',
  })
  product: ProductEntity;
}
