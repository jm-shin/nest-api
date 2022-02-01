import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly username: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly email: string;

  @IsString()
  readonly department: string;
}