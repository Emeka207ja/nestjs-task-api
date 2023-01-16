import { IsString, IsNotEmpty, IsInt } from "class-validator" 

export class createTaskDto{
    @IsString()
    @IsNotEmpty()
    message: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsInt()
    @IsNotEmpty()
    age: number;
}