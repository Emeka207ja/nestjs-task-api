import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthEntity } from "./entity/auth.entity";

export const GetUser = createParamDecorator((data:unknown, ctx:ExecutionContext):AuthEntity=> {
    const request = ctx.switchToHttp().getRequest();
    return request.user
})