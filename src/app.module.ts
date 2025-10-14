import { Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CartEntity,
  ProductEntity,
  ProductImageEntity,
  UserEntity,
} from './utils/typeorm';
import { Config } from './utils/Config';
import { ProductModule } from './product/product.module';
import { ProductCategoryEntity } from './utils/typeorm/entities/productCategory';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config.DATABASE.HOST,
      port: Config.DATABASE.PORT,
      username: Config.DATABASE.USERNAME,
      password: Config.DATABASE.PASSWORD,
      database: Config.DATABASE.NAME,
      entities: [
        UserEntity,
        CartEntity,
        ProductEntity,
        ProductImageEntity,
        ProductCategoryEntity,
      ],
      logging: false,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
