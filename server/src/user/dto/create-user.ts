import {ObjectId} from "mongoose";

export class CreateUserDto {
    readonly name;
    readonly email;
    readonly password;
    readonly birthday;
}