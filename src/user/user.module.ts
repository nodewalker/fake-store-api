import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Services } from 'src/utils/const';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCartEntity, UserEntity } from 'src/utils/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserCartEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => ProductModule),
  ],
  controllers: [UserController, CartController],
  providers: [
    { provide: Services.user, useClass: UserService },
    { provide: Services.cart, useClass: CartService },
  ],
  exports: [{ provide: Services.user, useClass: UserService }],
})
export class UserModule {}
