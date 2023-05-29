import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { taskEntity } from "src/task/task.entity";
import { AuthEntity } from "src/auth/auth.entity";

export const connectionConfig: TypeOrmModuleOptions = {

  type: 'postgres',
  host:
    process.env.NODE_ENV === 'production'
      ? process.env.PGHOST
      :"localhost",
  port:
    process.env.NODE_ENV === 'production'
      ? +process.env.PGPORT
      :  5432,
  username:
    process.env.NODE_ENV === 'production'
      ? process.env.PGUSER
      : 'postgres',
  password:
    process.env.NODE_ENV === 'production'
      ? process.env.PGPASSWORD
      : 'imprint',
  database:
    process.env.NODE_ENV === 'production'
      ? process.env.PGDATABASE
      : 'messagemanager',
  synchronize: process.env.NODE_ENV === 'development',
    // entities: [taskEntity, AuthEntity],
  entities:[__dirname+"../**/*.entity.ts" ],
};