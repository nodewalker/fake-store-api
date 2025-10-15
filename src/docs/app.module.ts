import { Module } from '@nestjs/common';
import { AuthController } from '../auth/controllers/auth.controller';
import { CategoryController } from '../product/controllers/category.controller';
import { ProductController } from '../product/controllers/product.controller';
import { CartController } from '../user/controllers/cart.controller';
import { UserController } from '../user/controllers/user.controller';
import { Services } from 'src/utils/const';

@Module({
  imports: [],
  controllers: [
    AuthController,
    ProductController,
    CategoryController,
    UserController,
    CartController,
  ],
  providers: [
    { provide: Services.auth, useValue: {} },
    { provide: Services.cart, useValue: {} },
    { provide: Services.category, useValue: {} },
    { provide: Services.product, useValue: {} },
    { provide: Services.user, useValue: {} },
  ],
})
export class AppModule {}
