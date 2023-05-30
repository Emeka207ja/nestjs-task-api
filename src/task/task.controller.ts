import { Controller,Get,Post,Patch,Body,Param,Delete,Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { taskDto } from './DTOs/task.dto';
import { createTaskDto } from './DTOs/createTask.Dto';
import { UpdateTaskDto } from './DTOs/UpdateTask.dto';
import { status } from './Enums/Status.Enums';
import { statusValidatorPipe } from './Pipes/taskStatus.pipe';
import { taskEntity } from './task.entity';
import { filterDto } from './DTOs/filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/jwt.guard';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { GetUser } from 'src/auth/getUser.decorator';

@Controller('task')
    @UseGuards(JwtGuard)
export class TaskController {
    constructor(private taskService: TaskService) { }
    @Get()
    getAllTask(
        @Query() query: filterDto,
        @GetUser() user:AuthEntity
    ) {
        return this.taskService.getAllTasks(query,user)
    }

    @Get(":id")
    getTaskById(@Param("id") id:number):Promise<taskEntity> {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(
        @Body() task: createTaskDto,
        @GetUser() user:AuthEntity
    ): Promise<number> {
        return this.taskService.createTask(task,user)
    }

    @Delete(":id")
    deleteTask(@Param("id") id: number):Promise<number|Error> {
        return this.taskService.deleteTask(id)
    }

    @Patch(":id")
    updateTask(@Param("id") id:number, @Body() task:createTaskDto) {
        return this.taskService.updateTask(id,task)
    }

    @Patch(":id/status")
    updateStatus(@Param("id") id: number, @Body("status",statusValidatorPipe) Status: status): Promise<number|Error> {
        return this.taskService.updateStatus(id,Status)
    }
}
