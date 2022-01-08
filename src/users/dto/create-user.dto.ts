import {IsDefined, IsEmail, IsString} from "class-validator";

export class CreateUserDto {
    @IsDefined()
    @IsString()
    readonly username: string;

    @IsDefined()
    @IsString()
    readonly password: string;

    @IsDefined()
    @IsString()
    readonly department: string;

    @IsDefined()
    @IsEmail()
    readonly email: string;
}