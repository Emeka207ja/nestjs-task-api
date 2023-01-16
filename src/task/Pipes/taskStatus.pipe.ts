import { PipeTransform, ArgumentMetadata, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "rxjs";
import { status } from "../Enums/Status.Enums";

export class statusValidatorPipe implements PipeTransform{
    readonly allowedStatus = [
        status.OPEN,
        status.CLOSE,
        status.IN_PROGRESS
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        if (!this.isValidStatus(value)) {
            throw new NotFoundException(`${value} is not an allowed status`)
        }
        return value;
    }

    private isValidStatus(value):boolean {
        const isPresent = this.allowedStatus.indexOf(value)
        return isPresent !==-1
    }

}