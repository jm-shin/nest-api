import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly department: string;
}