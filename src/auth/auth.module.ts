import { Services } from 'src/utils/const';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [{ provide: Services.auth, useClass: AuthService }],
  controllers: [AuthController],
})
export class AuthModule {}
