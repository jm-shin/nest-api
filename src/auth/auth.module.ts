import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './jwt.strategy';
import configuration from '../config/configuration';

@Module({
  imports: [
    JwtModule.register({
      secret: configuration().jwtSecretKey,
      signOptions: { expiresIn: '7d' },
    }),
    UsersModule,
    CommonModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
