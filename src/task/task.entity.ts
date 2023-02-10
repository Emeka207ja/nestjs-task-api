import { BaseEntity, Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "src/auth/auth.entity";



@Entity()
export class taskEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column()
    title: string
    
    @Column()
    age: number;

    @Column()
    status: string;

    @ManyToOne(() => AuthEntity, (user) => user.task, { eager: false })
    user: AuthEntity;

    @Column()
    userId:number
   
}