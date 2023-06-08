import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Track } from 'src/track/schemas/track.schemas';

export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @ApiProperty({ example: 'Album 1', description: 'Album name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'Maksym', description: 'AuthorId name' })
  @Prop()
  authorId: mongoose.ObjectId[];

  @ApiProperty({ example: '1000', description: 'Quantity of likes' })
  @Prop()
  likeCount: number;

  @ApiProperty({ example: '2002-03-21', description: 'Date of creation' })
  @Prop()
  dateCreate: Date;

  @ApiProperty({
    example:
      'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/*',
    description: 'URL of the picture source',
  })
  @Prop()
  picture: string;

  @ApiProperty({ example: 'genres', description: 'Genres' })
  @Prop({ required: true })
  genres: string;

  @ApiProperty({
    example: '{63ff69f93e2a577dcff552d0,63ff6a1ae0745ebaf548e0c0}',
    description: 'Tracks ID',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }] }) 
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
