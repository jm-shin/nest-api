import { IsDefined, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsDefined()
  @IsString()
  @ApiProperty({
    example: 'id',
    description: '아이디',
    required: true,
  })
  readonly id: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    example: 'name',
    description: '유저 네임',
    required: true,
  })
  readonly username: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: '패스워드',
    required: true,
  })
  password: string;

  @IsDefined()
  @IsString()
  @ApiProperty({
    example: 'dev',
    description: '부서명',
    required: true,
  })
  readonly department: string;

  @IsDefined()
  @IsEmail()
  @ApiProperty({
    example: 'id@email.com',
    description: '이메일',
    required: true,
  })
  readonly email: string;
}
