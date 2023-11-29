import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8)
    password: string;
}