import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserEntity } from '../entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '유저 등록',
    description: '신규 유저를 등록합니다.',
  })
  @ApiOkResponse()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('register')
  createUser(@Body() user: UserCreateDto): Promise<UserEntity> {
    return this.usersService.createUser(user);
  }
}
