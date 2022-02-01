import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { BcryptService } from '../common/bcrypt/bcrypt.service';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

class MockUserRepository {
  insert(user) {
    return {
      id: 'user1234',
      username: 'hong gil dong',
      password: 'hashed',
      department: 'dev',
      email: 'test@email.com',
      age: 30,
    };
  }
}

class MockBcryptService {
  hash() {
    return 'hashed';
  }
}

describe('UsersService', () => {
  let service: UsersService;
  let bcryptService: BcryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: MockUserRepository,
        },
        {
          provide: BcryptService,
          useClass: MockBcryptService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    bcryptService = module.get(BcryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('유저 정보를 저장한다. ', async () => {
    const user: CreateUserDto = {
      id: 'user1234',
      username: 'hong gil dong',
      password: 'password',
      department: 'dev',
      email: 'test@email.com',
      age: 30,
    };
    const newUser = Object.assign({}, user, { password: 'hashed' });
    expect(await service.createUser(user)).toEqual(newUser);
  });
});
