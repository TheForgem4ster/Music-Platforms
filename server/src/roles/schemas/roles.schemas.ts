import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import {ApiProperty} from "@nestjs/swagger";

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {

    @ApiProperty({example: "Admin", description: "Role unique value"})
    @Prop()
    value: string;

    @ApiProperty({example: "administrator", description: "Role description"})
    @Prop()
    description: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);