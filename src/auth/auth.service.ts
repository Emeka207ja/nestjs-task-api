import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './entity/auth.entity';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './DTO/siginin.dto';
import { NewUserDto } from './DTO/signup.dto';
import { jwtInterface } from './Interface/jwt.interface';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>,
        // private authRepository: AuthRepository,
        private jwtService:JwtService
    ) { }
    async CreateUser(newUser: NewUserDto): Promise<string> {
        const { email, password, username } = newUser;

    const auth = this.authRepository.create({
        email,
        password,
        username,
    });
        await this.authRepository.save(auth)
        
        return auth.email;
    }

    // async SignIn(signInDetails: SignInDto):Promise<{access_token:string}> {
    //     const username = await this.authRepository.SignIn(signInDetails)
    //     const signValue: jwtInterface = { username }
    //     const access_token =  this.jwtService.sign(signValue)
    //     return {access_token}
    // }
}
