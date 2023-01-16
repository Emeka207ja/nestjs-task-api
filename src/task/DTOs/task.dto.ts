
import { IsString, IsInt, IsNotEmpty } from "class-validator";
import { status } from "../Enums/Status.Enums";
export class taskDto{
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsInt()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    status: status;

    @IsString()
    @IsNotEmpty()
    id:string
}