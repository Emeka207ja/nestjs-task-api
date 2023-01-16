import {IsString,IsOptional,IsInt} from "class-validator"

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    message?: string;

    @IsString()
    @IsOptional()
    title?: string;
    
    @IsInt()
    @IsOptional()
    age?: number;
}