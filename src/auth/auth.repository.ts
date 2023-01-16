import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AuthEntity } from "./auth.entity";
import { NewUserDto } from "./DTO/signup.dto";

@Injectable()
export class AuthRepository extends Repository<AuthEntity>{

    async CreateUser(newUser: NewUserDto): Promise<string> {
        const user = new AuthEntity();
        user.username = newUser.username;
        user.email = newUser.email;
        user.password = newUser.password;
        await user.save()
        return user.id
        
    }
}