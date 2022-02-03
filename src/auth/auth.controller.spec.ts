import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const authServiceMock = { login: () => ({ jwt: 'jwt', username: 'user' }) };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: AuthService, useValue: authServiceMock }],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be login', async () => {
    expect(
      await controller.login({
        username: 'user',
        password: 'password',
      }),
    ).toEqual({
      jwt: 'jwt',
      username: 'user',
    });
  });
});
