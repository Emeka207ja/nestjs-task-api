import { IsNotEmpty, IsString } from "class-validator";
export class NewUserDto{
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    email:string
}