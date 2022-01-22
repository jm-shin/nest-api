import { IsDefined, IsString } from 'class-validator';

export class UserLoginDto {
  @IsDefined()
  @IsString()
  username: string;

  @IsDefined()
  @IsString()
  password: string;
}
