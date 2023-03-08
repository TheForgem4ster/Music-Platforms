import {IsNumber, IsString} from "class-validator";
import {ObjectId} from "mongoose";

export class AddRoleDto {
    @IsString({message: "Must be a string"})
    readonly value: string;
    @IsNumber({}, {message: "Must be a ID"})
    readonly userId: ObjectId;
}
