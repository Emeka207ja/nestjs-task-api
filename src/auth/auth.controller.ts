import { Controller, Post,Body,UseGuards,Req,Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignInDto } from './DTO/siginin.dto';
import { NewUserDto } from './DTO/signup.dto';
import { JwtGuard } from './jwt.guard';
import { GetUser } from './getUser.decorator';
import { AuthEntity } from './entity/auth.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post("/signup")
    CreateUser(@Body() newUser: NewUserDto) {
        return this.authService.CreateUser(newUser)
    }

    // @Post("/signin")
    // SignIn(@Body() signInDetail: SignInDto) {
    //     return this.authService.SignIn(signInDetail)
    // }

    @Post("/test")
    @UseGuards(JwtGuard)
    test(@GetUser() user:AuthEntity) {
        console.log("user",user)
        
    }
}
