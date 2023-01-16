import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { createTaskDto } from "./DTOs/createTask.Dto";
import { taskEntity } from "./task.entity";
import {status} from "./Enums/Status.Enums"
import { filterDto } from "./DTOs/filter.dto";

@Injectable()
export class TaskRepository extends Repository<taskEntity>{
    constructor(private dataSource:DataSource) {
        super(taskEntity,dataSource.createEntityManager())
    }
    async getAllTask(filters: filterDto): Promise<taskEntity[]> {
        const { status, search,age } = filters;
       
        const Qbuilder = this.createQueryBuilder("task");

        if (status) {
            Qbuilder.andWhere('task.status  = :status',{status})
        }

        if (age) {
            Qbuilder.andWhere('task.age = :age',{age})
        }

        if (search) {
            Qbuilder.andWhere('task.title LIKE :search OR task.message LIKE :search', {search: `%${search}%`})
        }
        
        const Tasks = await Qbuilder.getMany();
        return Tasks;
     }
    
    async CreateTask(IncomingTask: createTaskDto):Promise<number> {
        const Task = new taskEntity()
        Task.title = IncomingTask.title,
        Task.message = IncomingTask.message,
        Task.age  = IncomingTask.age
        Task.status = status.OPEN  
        await this.save(Task);
        return Task.id;
    }
}