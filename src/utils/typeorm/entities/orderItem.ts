import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order';

@Entity('order_product')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  _uuid: string;

  @Column({ name: 'product_uuid' })
  productUuid: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;

  @Column()
  totalPrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.products)
  order: OrderEntity;
}
