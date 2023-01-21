import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRepository } from "./auth.repository";
import { Strategy, ExtractJwt } from "passport-jwt";
import {Injectable} from "@nestjs/common"
import { jwtInterface } from "./Interface/jwt.interface";
import {UnauthorizedException} from "@nestjs/common"
import { AuthEntity } from "./auth.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET,
            
        })
        
    }
    async validate(payload: jwtInterface): Promise<AuthEntity> {
        console.log("payload",payload)
        const { username } = payload;
        const user = await this.authRepository.findOneBy({ username })
        
        if (!user) {
            throw new UnauthorizedException("user not found")
        }
        return user;
    }
}