import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MockType } from '../../test/mock.type';
import { BcryptService } from '../common/bcrypt/bcrypt.service';
import {
  bcryptServiceFactory,
  jwtServiceFactory,
  usersServiceFactory,
} from '../../test/mocks/jest-mock';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let bcryptService: MockType<BcryptService>;
  let userService: MockType<UsersService>;
  let jwtService: MockType<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useFactory: usersServiceFactory },
        { provide: JwtService, useFactory: jwtServiceFactory },
        { provide: BcryptService, useFactory: bcryptServiceFactory },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    bcryptService = module.get(BcryptService);
    userService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should reject login if user not found', async () => {
    bcryptService.checkEncryptedData.mockReturnValue(false);
    userService.findOneByUsername.mockReturnValue(null);
    await expect(
      service.login({ username: 'user', password: '' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(userService.findOneByUsername).toBeCalledWith('user');
  });

  it('should reject login if password is wrong', async () => {
    bcryptService.checkEncryptedData.mockReturnValue(false);
    userService.findOneByUsername.mockReturnValue({
      username: 'user',
      password: 'encrypted',
    });
    await expect(
      service.login({ username: 'user', password: 'password' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(userService.findOneByUsername).toBeCalledWith('user');
    expect(bcryptService.checkEncryptedData).toBeCalledWith(
      'password',
      'encrypted',
    );
  });
});
