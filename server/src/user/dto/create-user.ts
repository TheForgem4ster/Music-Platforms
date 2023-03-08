import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({example: "maksym", description: "User name"})
    readonly username: string;

    @ApiProperty({example: "maksym@gmail.com", description: "User email"})
    readonly email: string;

    @ApiProperty({example: "123456", description: "User password"})
    readonly password: string;

    @ApiProperty({example: "2002-03-21", description: "User birthday"})
    readonly birthday: Date;

    @ApiProperty({example: "admin", description: "User roleId"})
    rolesvalue: string;
}