import { Controller, Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from './DTO/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post()
    CreateUser(@Body() newUser: NewUserDto) {
        console.log("user",newUser)
        return this.authService.CreateUser(newUser)
    }
}
