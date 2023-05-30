import { BaseEntity, Column, Entity,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthEntity } from "src/auth/entity/auth.entity";



@Entity()
export class taskEntity  {
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

   
   
}