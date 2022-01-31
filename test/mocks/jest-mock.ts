import { MockType } from '../mock.type';
import { BcryptService } from '../../src/common/bcrypt/bcrypt.service';
import { UsersService } from '../../src/users/users.service';
import { JwtService } from '@nestjs/jwt';

export const usersServiceFactory: () => MockType<UsersService> = jest.fn(
  () => ({
    findOneByUsername: jest.fn(),
    createUser: jest.fn(),
    createUserWithUniqueName: jest.fn(),
    updateUser: jest.fn(),
    findOneByEmail: jest.fn(),
    getAllUsers: jest.fn(),
    findOneById: jest.fn(),
  }),
);

export const jwtServiceFactory: () => MockType<JwtService> = jest.fn(() => ({
  sign: jest.fn(),
  signAsync: jest.fn(),
  verify: jest.fn(),
  verifyAsync: jest.fn(),
  decode: jest.fn(),
}));

export const bcryptServiceFactory: () => MockType<BcryptService> = jest.fn(
  () => ({
    hash: jest.fn(),
    checkEncryptedData: jest.fn(),
  }),
);
