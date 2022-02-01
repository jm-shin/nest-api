import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { transformInterceptor } from '../common/interceptors/transform.interceptor';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  @UseInterceptors(transformInterceptor)
  async createUser(@Body() body: CreateUserDto) {
    await this.usersService.createUser(body);
  }
}
