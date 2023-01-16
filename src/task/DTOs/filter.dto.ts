import { status } from "../Enums/Status.Enums";
import { IsString } from "class-validator";
export class filterDto{
    @IsString()
    status: status;
    @IsString()
    search: string;
    @IsString()
    age:string
}