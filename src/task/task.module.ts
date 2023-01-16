import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';
import { taskEntity } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([taskEntity])],
  controllers: [TaskController],
  providers: [TaskService,TaskRepository]
})
export class TaskModule {}
