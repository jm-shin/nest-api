import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOkResponse, ApiOperation, ApiProperty, ApiTags} from "@nestjs/swagger";

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    @ApiOperation({summary: '유저 등록'})
    @ApiOkResponse()
    @HttpCode(200)
    @Post('register')
    async createUser(@Body() body: CreateUserDto) {
        await this.usersService.save(body);
    }

}
