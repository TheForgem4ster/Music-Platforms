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

    @Prop()
    author: string;

    @Prop()
    time: Number;

    @Prop()
    likeCount: Number;

    @Prop()
    dateCreate: Date;

    @Prop()
    picture: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] })
    tracks: Track[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    album: User
}

export const AlbumSchema = SchemaFactory.createForClass(Album);