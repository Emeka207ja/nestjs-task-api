import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { taskEntity } from "src/task/task.entity";
import { AuthEntity } from "src/auth/entity/auth.entity";

export const connectionConfig: TypeOrmModuleOptions =

  process.env.NODE_ENV === 'production' ? {

    type: 'postgres',

    url: process.env.DATABASE_URL,

    synchronize: false,

    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // entities: [AuthEntity,taskEntity],

}

:

{

  type: 'postgres',

  host: 'localhost',

  port: 5432,

  username: 'postgres',

  password: 'imprint',

  database: 'messagemanager',

  synchronize: true,

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

};