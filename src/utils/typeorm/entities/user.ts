import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserCartEntity } from './userCart';
import { ProductCategoryEntity } from './productCategory';
import { ProductEntity } from './product';
import { Exclude } from 'class-transformer';
import { ReviewEntity } from './review';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  _uuid: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  login: string;

  @Column({ unique: true })
  email: string;

  // TODO: nullable after google auth
  @Exclude()
  @Column()
  password: string;

  @Column({ nullable: true })
  avatarURL: string;

  @OneToOne(() => UserCartEntity, (cart) => cart.user)
  @JoinColumn()
  cart: UserCartEntity;

  @OneToMany(() => ProductCategoryEntity, (category) => category.user)
  categories: ProductCategoryEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];
}
