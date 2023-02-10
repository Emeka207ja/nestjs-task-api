import { Injectable,NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { createTaskDto } from './DTOs/createTask.Dto';
import { taskDto } from './DTOs/task.dto';
import { UpdateTaskDto } from './DTOs/UpdateTask.dto';
import { status } from './Enums/Status.Enums';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { taskEntity } from './task.entity';
import { filterDto } from './DTOs/filter.dto';
import { AuthEntity } from 'src/auth/auth.entity';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) { }
    // private tasks: taskDto[] = []
    
    async getAllTasks(
        filters: filterDto,
        user:AuthEntity
    ) {
        return  this.taskRepository.getAllTask(filters,user)
    }

    async createTask(
        incomingTask: createTaskDto,
        user:AuthEntity
    ): Promise<number> {
        return await this.taskRepository.CreateTask(incomingTask,user)
    }

    async getTaskById(idx: number):Promise<taskEntity|undefined> {
        const found = await this.taskRepository.findOneBy({ id: idx })
        if (!found) {
            throw new NotFoundException()
        }
        return found;
    }

    async deleteTask(id: number): Promise<number|Error>{
        const deletedTask = await this.taskRepository.delete(id)
        console.log(deletedTask)
        if (deletedTask.affected === 0) {
            throw new NotFoundException(`id ${id} does not exist`)
        }
        return deletedTask.affected;
    }

    async updateStatus(id: number, incomingStatus:status):Promise<number|Error> {
        const task = await this.getTaskById(id)
        task.status = incomingStatus;
        const updated = await this.taskRepository.update(id, task)
        return updated.affected;
    }

    async updateTask(id: number, incomingTask: createTaskDto): Promise<number|Error> {
        const task = await this.getTaskById(id);
        task.title = incomingTask.title || task.title;
        task.age = incomingTask.age || task.age;
        task.message = incomingTask.message || task.message;
        const updated = await this.taskRepository.update(id,task);
        return updated.affected;
    }

    // createTask(task: createTaskDto): string {
    //     const taskObj: taskDto = {
    //         id:uuidv4(),
    //         title: task.title,
    //         message: task.message,
    //         age:task.age,
    //         status:status.OPEN
    //     }
    //     this.tasks.push(taskObj);
    //     return taskObj.id;
    // }

    

    // private findIndex(idx: string):number { 
    //     return this.tasks.findIndex(task=>task.id===idx)
    // }
    
    // updateTask(idx: string,task:UpdateTaskDto):string|Error {
    //     const found = this.getTaskById(idx);
    //     const index = this.findIndex(idx)
    //     if (!found) {
    //         throw new NotFoundException()
    //     }
    //     if (index > -1) {
    //         if (task.age) {
    //             found.age = task.age
    //         }
    //         if (task.message) {
    //             found.message = task.message;
    //         }
    //         if (task.title) {
    //             found.title = task.title;
    //         }
    //     }
    //     this.tasks[index] = found;
    //     return this.tasks[index].id
    // }
    // deleteTask(idx: string):taskDto[]|Error {
    //     const index = this.findIndex(idx)
    //     if (index === -1) {
    //         throw new NotFoundException();
    //     }
    //      return this.tasks.filter(task => task.id !== idx);
       
    // }
    // updateStatus(idx: string, status: status): string | Error {
    //     const found = this.getTaskById(idx);
    //     const index = this.findIndex(idx)
    //     if (!found) {
    //         throw new NotFoundException();
    //     }
    //     if (index > -1) {
    //         found.status = status;
    //     }
    //     this.tasks[index] = found;
    //     return  this.tasks[index].id
    // }
}
