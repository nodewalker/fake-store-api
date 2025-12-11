import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user';
import { OrderItemEntity } from './orderItem';
import { OrderStatus } from 'src/utils/const';

@Entity('user_order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  _uuid: string;

  @OneToMany(() => OrderItemEntity, (product) => product.order)
  products: OrderItemEntity[];

  @Column({ enum: OrderStatus })
  status: OrderStatus;

  @Column()
  adress: string;

  @Column({ name: 'total_price' })
  totalPrice: number;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @Column({ nullable: true, name: 'completed_at' })
  completedAt: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: number;
}
