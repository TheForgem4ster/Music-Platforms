import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        console.log(obj)
        const error = await validate(obj);

        if(error.length){
            console.log(error)
            // let messages = error.map(err => {
            //     return `${err.property} - `
            // })
            throw new ValidationException('aaaa');
        }
        return value;
    }

}