import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Services } from 'src/utils/const';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [{ provide: Services.user, useClass: UserService }],
  exports: [{ provide: Services.user, useClass: UserService }],
})
export class UserModule {}
