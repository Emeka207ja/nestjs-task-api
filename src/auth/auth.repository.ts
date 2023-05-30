import { ConflictException, HttpException, Injectable, InternalServerErrorException,NotFoundException,HttpStatus } from "@nestjs/common";
import { Repository,DataSource } from "typeorm";
import { AuthEntity } from "./entity/auth.entity";
import { NewUserDto } from "./DTO/signup.dto";
import * as bcrypt from "bcrypt"
import { SignInDto } from "./DTO/siginin.dto";

@Injectable()
export class AuthRepository extends Repository<AuthEntity>{
     constructor(private dataSource:DataSource) {
        super(AuthEntity,dataSource.createEntityManager())
    }

    // async CreateUser(newUser: NewUserDto): Promise<string> {
        
    //     const salt = await bcrypt.genSalt()
    //     const user = new AuthEntity();
    //     user.username = newUser.username;
    //     user.email = newUser.email;
    //     user.salt = await bcrypt.genSalt();
    //     user.password = await this.HashPassword(newUser.password, user.salt);
    //      console.log(user.salt)
       
    //     // user.task = []
       
    //     try {
    //         await user.save()
    //          console.log(user)
    //         return user.id
    //     } catch (error) {
          
    //         if (error.code === '23505') {
    //            throw new ConflictException("username or email already exist")
    //        }else{
    //         throw new InternalServerErrorException()
    //         }
    //     }   
    // }

    async SignIn(signInDetails: SignInDto): Promise<string> {
       
        try {
            const { password, email } = signInDetails;
            const user = await this.findOneBy({ email: email });
            
            if (!user) {
                throw new NotFoundException("email or password not found")
            }
            
            if (user ) {
                return user.username;
            } else {
                throw new NotFoundException("email or password not found")
            }
        } catch (error) {

            throw new HttpException("problem signing in",HttpStatus.BAD_REQUEST)
            
        }
    }

    async HashPassword(password: string, saltString: string):Promise<string> {
        return await bcrypt.hash(password,saltString)
    }
}