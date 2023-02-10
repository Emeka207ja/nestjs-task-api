import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { createTaskDto } from "./DTOs/createTask.Dto";
import { taskEntity } from "./task.entity";
import {status} from "./Enums/Status.Enums"
import { filterDto } from "./DTOs/filter.dto";
import { AuthEntity } from "src/auth/auth.entity";
import { taskDto } from "./DTOs/task.dto";

@Injectable()
export class TaskRepository extends Repository<taskEntity>{
    constructor(private dataSource:DataSource) {
        super(taskEntity,dataSource.createEntityManager())
    }
    async getAllTask(
        filters: filterDto,
        user:AuthEntity
    ):Promise<taskEntity[]>{
        const { status, search, age } = filters;
        
        // return this.createQueryBuilder().select('*').getRawMany()
    //    console.log(user.id)
        const Qbuilder = this.createQueryBuilder("task");
        Qbuilder.where("task.userId = :userId", { userId : user.id })
        

        if (status) {
            Qbuilder.andWhere('task.status  = :status',{status})
        }

        if (age) {
            Qbuilder.andWhere('task.age = :age',{age})
        }

        if (search) {
            Qbuilder.andWhere('(task.title LIKE :search OR task.message LIKE :search)', {search: `%${search}%`})
        }
        
        const Tasks = await Qbuilder.getMany();
       
        return Tasks;
     }
    
    async CreateTask(
        IncomingTask: createTaskDto,
        user:AuthEntity
    ): Promise<number> {
        const Task = new taskEntity()
        Task.title = IncomingTask.title,
        Task.message = IncomingTask.message,
        Task.age  = IncomingTask.age,
        Task.status = status.OPEN,
        Task.user= user    
        await this.save(Task);
        return Task.id;
    }
}