import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './DTO/siginin.dto';
import { NewUserDto } from './DTO/signup.dto';
import { jwtInterface } from './Interface/jwt.interface';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
        private jwtService:JwtService
    ) { }
    async CreateUser(newUser: NewUserDto): Promise<string> {
        return await this.authRepository.CreateUser(newUser)
    }

    async SignIn(signInDetails: SignInDto):Promise<{access_token:string}> {
        const username = await this.authRepository.SignIn(signInDetails)
        const signValue: jwtInterface = { username }
        const access_token =  this.jwtService.sign(signValue)
        return {access_token}
    }
}
