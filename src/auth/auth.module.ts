import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { JwtStraregy } from './auth.strategy';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStraregy]
})
export class AuthModule {}
