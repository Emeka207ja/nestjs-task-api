import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { taskEntity } from "src/task/task.entity";
import { AuthEntity } from "src/auth/auth.entity";

export const connectionConfig: TypeOrmModuleOptions = {

  type: 'postgres',
  host:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_HOST
      :"localhost",
  port:
    process.env.NODE_ENV === 'production'
      ? +process.env.PROD_DATABASE_PORT
      :  5432,
  username:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_USERNAME
      : 'postgres',
  password:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_PASSWORD
      : 'imprint',
  database:
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_DATABASE_DBNAME
      : 'messagemanager',
  synchronize: process.env.NODE_ENV === 'development',
    entities: [taskEntity, AuthEntity],
  // entities:[__dirname+"../**/*.entity.ts" ],
};