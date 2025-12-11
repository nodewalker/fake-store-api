import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Services } from 'src/utils/const';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  OrderEntity,
  OrderProductEntity,
  UserCartEntity,
  UserEntity,
} from 'src/utils/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartService } from './services/cart.service';
import { ProductModule } from 'src/product/product.module';
import { CartController } from './controllers/cart.controller';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserCartEntity,
      OrderEntity,
      OrderProductEntity,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [UserController, CartController, OrderController],
  providers: [
    { provide: Services.user, useClass: UserService },
    { provide: Services.cart, useClass: CartService },
    { provide: Services.order, useClass: OrderService },
  ],
  exports: [{ provide: Services.user, useClass: UserService }],
})
export class UserModule {}
