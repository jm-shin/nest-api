import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from './auth.service';

class LoginResponse {
  jwt: string;
  user: UserEntity;
}

@Controller('auth')
@ApiTags('users')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    @ApiOperation({
        summary: 'Login',
        description: '',
    })
    async login (@Body() userLogin): Promise<LoginResponse> {
        return this.authService.login(userLogin);
    }
}
