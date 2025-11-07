import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user';
import { ProductEntity } from './product';

@Entity('review')
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column()
  content: string;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.reviews)
  product: ProductEntity;
}
