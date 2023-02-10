import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt"
import { taskEntity } from "src/task/task.entity";

@Entity()
@Unique(["username","email"])
export class AuthEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;
    
    @Column()
    password: string;
    
    @Column()
    salt: string;

    @OneToMany(()=>taskEntity,(task)=>task.user,{eager:true})
    task:taskEntity[]

    async validatePassword(password: string):Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password
    }
}