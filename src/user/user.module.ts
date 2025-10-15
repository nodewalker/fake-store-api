import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { Services } from 'src/utils/const';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCartEntity, UserEntity } from 'src/utils/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserCartEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [{ provide: Services.user, useClass: UserService }],
  exports: [{ provide: Services.user, useClass: UserService }],
})
export class UserModule {}
