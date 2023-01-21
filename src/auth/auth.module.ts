import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from './auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from './jwt.guard';


@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600
      }
    }),
     PassportModule,
    TypeOrmModule.forFeature([AuthEntity]),
   
   
   
  ],
  providers: [AuthService,AuthRepository, JwtStrategy, JwtGuard,],
  controllers: [
    AuthController,
  ],
  exports: [
    JwtStrategy,
    PassportModule,
    JwtGuard

  ]
})
export class AuthModule {}
