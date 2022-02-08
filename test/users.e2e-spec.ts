import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
// import * as request from 'supertest';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { UsersService } from '../src/users/users.service';
import { MockType } from './mock.type';

jest.setTimeout(10_000);

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let userServiceMock: MockType<UsersService>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
        .overrideProvider(UsersService)
        .useValue(userServiceMock)
        .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    //drop database
    await getConnection().synchronize(true);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('should reject login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'faker', password: '123456' })
      .expect(401)
      .expect((res) => res.body.message === 'Unknown user');
  });
});