import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MockType } from '../../test/mock.type';
import { UsersService } from './users.service';
import { usersServiceFactory } from '../../test/mocks/jest-mock';
import { UserEntity } from '../entities/user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: MockType<UsersService>;
  const user: UserEntity = {
    id: 'id',
    username: 'user',
    password: 'password',
    email: 'email@email.com',
    department: 'dev',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: usersServiceFactory }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userServiceMock = module.get(UsersService);
  });

  it('should create a user', async () => {
    userServiceMock.createUser.mockReturnValue(user);
    expect(
      controller.createUser({
        id: 'id',
        username: 'user',
        password: 'password',
        email: 'email@email.com',
        department: 'dev',
      }),
    ).toEqual(user);
  });
});
