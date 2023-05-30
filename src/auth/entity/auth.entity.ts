import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt"
import { taskEntity } from "src/task/task.entity";

@Entity(
    {
        name:"auths"
    }
)
@Unique(["username","email"])
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;
    

   

    
}