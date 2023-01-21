import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { connectionConfig } from './Config/connection.db';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TaskModule,
    TypeOrmModule.forRoot(connectionConfig),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
