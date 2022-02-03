import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../entities/user.entity';
import { instanceToPlain } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/user-login.dto';
import { BcryptService } from '../common/bcrypt/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async login(login: UserLoginDto): Promise<{ jwt: string; user: UserEntity }> {
    const user = await this.usersService.findOneByUsername(login.username);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Unknown user');
    }
    if (!user.password) {
      throw new BadRequestException();
    }

    if (
      !(await this.bcryptService.checkEncryptedData(
        login.password,
        user.password,
      ))
    ) {
      throw new UnauthorizedException('Wrong Password!');
    }
    return await this.createToken(user);
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

  async validateUser(payload) {
    const user = await this.usersService.findOneByUsername(payload.username);
    if (!user) {
      return null;
    }
    const result = await this.bcryptService.checkEncryptedData(
      payload.password,
      user.password,
    );
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }
}
