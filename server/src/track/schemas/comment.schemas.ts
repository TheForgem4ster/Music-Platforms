import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { Track } from './track.schemas';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @ApiProperty({ example: "Illia", description: "User name" })
  @Prop()
  username: string;

  @ApiProperty({ example: "This track is lit!", description: "String with user comment" })
  @Prop()
  text: string;

  @ApiProperty({ example: "63ff69f93e2a577dcff552d0", description: "Id of the track" })
  @Prop({type: mongoose.Schema.Types.ObjectId, ref:'Track' })
  track: Track;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);