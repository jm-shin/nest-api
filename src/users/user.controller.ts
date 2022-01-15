import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({
    summary: '유저 등록',
    description: '신규 유저를 등록합니다.',
  })
  @ApiOkResponse()
  @HttpCode(200)
  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.save(body);
  }
}
