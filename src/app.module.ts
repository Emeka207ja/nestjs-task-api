import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { connectionConfig } from './Config/connection.db';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRootAsync(connectionConfig),
    AuthModule,
    ChatModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
