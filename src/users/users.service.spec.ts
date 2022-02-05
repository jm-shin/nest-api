import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { BcryptService } from '../common/bcrypt/bcrypt.service';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import {
  bcryptServiceFactory,
  repositoryMockFactory,
} from '../../test/mocks/jest-mock';
import { MockType } from '../../test/mock.type';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let bcryptService: MockType<BcryptService>;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: BcryptService,
          useFactory: bcryptServiceFactory,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
    bcryptService = module.get(BcryptService);
  });

  describe('createUser', () => {
    it('유저 정보를 저장해야 합니다. ', async () => {
      const user: UserCreateDto = {
        id: 'user1234',
        username: 'jongminshin',
        password: 'password',
        department: 'dev',
        email: 'test@email.com',
      };
      bcryptService.hash.mockReturnValue('hashed');
      const newUser = Object.assign({}, user, { password: 'hashed' });
      expect(await service.createUser(user)).toEqual(newUser);
    });
    it('중복된 유저네임은 거절해야 합니다.', async () => {
      const user: UserCreateDto = {
        id: 'user1234',
        username: 'jongminshin',
        password: 'password',
        department: 'dev',
        email: 'test@email.com',
      };
      repositoryMock.findOne.mockReturnValue(user);
      try {
        await service.createUser(user);
        fail(BadRequestException);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.error).toContain('username');
      }
    });
    it('중복된 메일 주소는 거부해야 합니다.', async () => {
      const user: UserCreateDto = {
        id: 'user1234',
        username: 'jongminshin',
        password: 'password',
        department: 'dev',
        email: 'test@email.com',
      };
      repositoryMock.findOne.mockReturnValueOnce(null);
      repositoryMock.findOne.mockReturnValueOnce(user);
      try {
        await service.createUser(user);
        fail(BadRequestException);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.response.error).toContain('email');
        expect(repositoryMock.findOne).toHaveBeenCalledTimes(2);
      }
    });
  });
});
