import {ObjectId} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsDateString, IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: "maksym", description: "User name"})
    @IsString({message: "Should be a string"})
    readonly username: string;

    @ApiProperty({example: "maksym@gmail.com", description: "User email"})
    @IsEmail({},{message: "Uncorrected email"})
    readonly email: string;

    @ApiProperty({example: "123456", description: "User password"})
    @IsString({message: "Password should be a string"})
    @Length(4,20, {message: "Password must be at least 4 and no more than 20 characters"})
    readonly password: string;

    @ApiProperty({example: "2002-03-21", description: "User birthday"})
    @IsDateString({},{message: "birthday should be a data"})
    readonly birthday: Date;

    // @ApiProperty({example: "Admin", description: "User roleId"})
    // @IsString({message: "rolesvalue should be a string"})
    // readonly rolesvalue: string;
}