import { BaseEntity } from "typeorm";

export class AuthEntity extends BaseEntity{
    id: string;
    username: string;
    email: string;
    password:string
}