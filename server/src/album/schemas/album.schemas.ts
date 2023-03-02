import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose";
import {Track} from "../../track/schemas/track.schemas";
import { User } from 'src/user/schemas/user.schemas';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
    @Prop()
    name: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref:'User' })
    authorId: User;

    @Prop()
    likeCount: Number;

    @Prop()
    dateCreate: Date;

    @Prop()
    picture: string;

    @Prop()
    tracks: mongoose.ObjectId[];

}

export const AlbumSchema = SchemaFactory.createForClass(Album);