import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from './cart';
import { ProductCategoryEntity } from './productCategory';

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

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarURL: string;

  @OneToOne(() => CartEntity, (cart) => cart.user)
  @JoinColumn()
  cart: CartEntity;

  @OneToMany(() => ProductCategoryEntity, (category) => category.user)
  categories: ProductCategoryEntity[];
}
