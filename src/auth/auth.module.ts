import { Services } from 'src/utils/const';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { Config } from 'src/utils/Config';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT.SECRET,
    }),
    forwardRef(() => UserModule),
  ],
  providers: [{ provide: Services.auth, useClass: AuthService }],
  controllers: [AuthController],
  exports: [{ provide: Services.auth, useClass: AuthService }],
})
export class AuthModule {}
