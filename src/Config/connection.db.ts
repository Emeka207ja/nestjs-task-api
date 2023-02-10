import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { taskEntity } from "src/task/task.entity";
import { AuthEntity } from "src/auth/auth.entity";

export const connectionConfig: TypeOrmModuleOptions= {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "imprint",
    database: "messagemanager",
    entities: [taskEntity, AuthEntity],
    synchronize:true
    // entities:[__dirname+"../**/*.entity.ts" ],
}