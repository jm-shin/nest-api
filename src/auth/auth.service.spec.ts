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
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

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
  //login
  describe('로그인 시, ', () => {
    it('유저를 찾을 수 없는 경우 로그인을 거부해야 합니다.', async () => {
      bcryptService.checkEncryptedData.mockReturnValue(false);
      userService.findOneByUsername.mockReturnValue(null);
      await expect(
        service.login({ username: 'user', password: '' }),
      ).rejects.toThrow(UnauthorizedException);
      expect(userService.findOneByUsername).toBeCalledWith('user');
    });

    it('암호가 잘못된 경우 로그인을 거부해야 합니다.', async () => {
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

    it('암호가 아닌 계정인 경우 로그인을 거부해야 합니다.', async () => {
      userService.findOneByUsername.mockReturnValueOnce({
        username: 'user',
        password: null,
      });
      bcryptService.checkEncryptedData.mockReturnValueOnce(false);
      await expect(
        service.login({ username: 'user', password: 'password' }),
      ).rejects.toThrow(BadRequestException);
      expect(userService.findOneByUsername).toBeCalledWith('user');
    });

    it('올바른 자격증명에 대해서 로그인을 허용해야 합니다.', async () => {
      bcryptService.checkEncryptedData.mockReturnValueOnce(true);
      jwtService.sign.mockReturnValue('token');
      const user = {
        username: 'user',
        password: 'encrypt',
      };
      userService.findOneByUsername.mockReturnValue(user);
      const token = await service.login({
        username: 'user',
        password: 'password',
      });
      expect(token).toEqual({
        jwt: 'token',
        user: expect.objectContaining({
          username: 'user',
        }),
      });
      expect(userService.findOneByUsername).toBeCalledWith('user');
      expect(bcryptService.checkEncryptedData).toBeCalledWith(
        'password',
        'encrypt',
      );
    });
  });
  //validateUser
  describe('유저 검증시,', () => {
    it('유저정보가 없다면 null을 반환해야 합니다.', async () => {
      userService.findOneByUsername.mockReturnValueOnce(null);
      expect(
        await service.validateUser({
          username: 'notExistUserName',
          password: 'password',
        }),
      ).toEqual(null);
    });
  });
});
