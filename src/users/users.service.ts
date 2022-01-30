import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../common/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private bcryptService: BcryptService,
  ) {}

  async save(user) {
    //TODO: 이메일 중복 체크
    if (user.password) {
      user.password = await this.bcryptService.hash(user.password);
    }
    return this.userRepository.insert(user);
  }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
