import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login): Promise<{ jwt: string; user: UserEntity }> {
    const user = await this.usersService.findOneByUsername(login.username);
    if (!user) {
      throw new UnauthorizedException('Unknown user');
    }
    if (!user.password) {
      throw new BadRequestException();
    }

    //TODO: bcrypt checkEncryptedData
    return this.createToken(user);
  }

  async createToken(user: UserEntity) {
    const payload = {
      username: user.username,
      sub: user.id,
    };
    return {
      jwt: this.jwtService.sign(payload),
      user: instanceToPlain<UserEntity>(user) as UserEntity,
    };
  }

  async validateUser(payload): Promise<UserEntity> {
    return this.usersService.findOneByUsername(payload.username);
  }
}
