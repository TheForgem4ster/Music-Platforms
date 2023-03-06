import {ObjectId} from "mongoose";

export class CreateUserDto {
    readonly username;
    readonly email;
    readonly password;
    readonly birthday;
}