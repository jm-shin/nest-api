import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';

@Module({
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: 'tmp_jwt_key',
      signOptions: { expiresIn: '60s' },
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
