import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @ApiProperty({example: "Maksym", description: "User name"})
    @Prop({ required: true })
    username: string;

    @ApiProperty({example: "maksym@gmail.com", description: "User email"})
    @Prop({ required: true, unique: true })
    email: string;

    @ApiProperty({example: "123456", description: "User password"})
    @Prop()
    password: string;

    @ApiProperty({example: "2002-03-21", description: "User birthday"})
    @Prop()
    birthday: Date;

    @ApiProperty({example: "{64008a0a28d36e560f2946cf, 64008a0a28d36e560f2946f5}", description: "array of albums"})
    @Prop()
    albums:  mongoose.ObjectId[];

    @ApiProperty({example: "{Admin}", description: "array of roles"})
    @Prop()
    roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);