import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { MockType } from '../../test/mock.type';
import { UsersService } from './users.service';
import { usersServiceFactory } from '../../test/mocks/jest-mock';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: MockType<UsersService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useFactory: usersServiceFactory }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    userServiceMock = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
