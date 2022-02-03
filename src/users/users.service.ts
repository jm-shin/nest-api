import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../common/bcrypt/bcrypt.service';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService,
  ) {}

  async createUser(user: UserCreateDto): Promise<UserEntity> {
    if (await this.findOneByUsername(user.username)) {
      throw new BadRequestException(
        'username already exist',
        'username already exist',
      );
    }
    if (user.email && (await this.findOneByEmail(user.email))) {
      throw new BadRequestException(
        'email already exist',
        'email already exist',
      );
    }
    if (user.password) {
      user.password = await this.bcryptService.hash(user.password);
    }
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }
}
