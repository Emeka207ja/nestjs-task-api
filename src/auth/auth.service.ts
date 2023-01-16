import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { AuthRepository } from './auth.repository';
import { NewUserDto } from './DTO/signup.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository:AuthRepository
    ) { }
    async CreateUser(newUser: NewUserDto): Promise<string> {
        return await this.authRepository.CreateUser(newUser)
    }
}
