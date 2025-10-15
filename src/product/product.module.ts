import { Services } from 'src/utils/const';
import { Module, forwardRef } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { ProductEntity, ProductImageEntity } from 'src/utils/typeorm';
import { ProductCategoryEntity } from 'src/utils/typeorm/entities/productCategory';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductImageEntity,
      ProductCategoryEntity,
    ]),
    forwardRef(() => UserModule),
    AuthModule,
  ],
  providers: [
    { provide: Services.product, useClass: ProductService },
    { provide: Services.category, useClass: CategoryService },
  ],
  controllers: [ProductController, CategoryController],
  exports: [{ provide: Services.product, useClass: ProductService }],
})
export class ProductModule {}
