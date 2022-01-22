import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(data) {
    return this.userRepository.insert(data);
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
