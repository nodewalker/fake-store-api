import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './utils/typeorm';
import { Config } from './utils/Config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config.DATABASE.HOST,
      port: Config.DATABASE.PORT,
      username: Config.DATABASE.USERNAME,
      password: Config.DATABASE.PASSWORD,
      database: Config.DATABASE.NAME,
      entities: [UserEntity],
      logging: false,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
