import { Logger, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  UserCartEntity,
  ProductEntity,
  ProductImageEntity,
  UserEntity,
  ReviewEntity,
} from './utils/typeorm';
import { Config } from './utils/Config';
import { ProductModule } from './product/product.module';
import { ProductCategoryEntity } from './utils/typeorm/entities/productCategory';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV?.trim() ? process.env.NODE_ENV?.trim() : 'prod'}`,
      isGlobal: true,
      load: [Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('db_host'),
        port: configService.get<number>('db_port'),
        username: configService.get<string>('db_user'),
        password: configService.get<string>('db_password'),
        database: configService.get<string>('db_name'),
        entities: [
          UserEntity,
          UserCartEntity,
          ProductEntity,
          ProductImageEntity,
          ProductCategoryEntity,
          ReviewEntity,
        ],
        logging: false,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  providers: [Logger],
})
export class AppModule {}
