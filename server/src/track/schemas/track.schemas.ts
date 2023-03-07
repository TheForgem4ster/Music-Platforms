import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Album } from 'src/album/schemas/album.schemas';

export type TrackDocument = HydratedDocument<Track>;

@Schema()
export class Track {
    @ApiProperty({ example: "Track 1", description: "Track name" })
    @Prop()
    name: string;

    @ApiProperty({ example: "Maksym", description: "Artist name" })
    @Prop()
    artist: string;

    @ApiProperty({
        example: "Verse 1:Walking down the street\n With my head up high\n Feeling the sunshine\n On my skin, oh my\n Nothing's gonna bring me down\n I'm unstoppable now", description: "Lyrics"
    })
    @Prop()
    text: string;
    @ApiProperty({ example: "1000", description: "Quantity of listens" })
    @Prop()
    listens: number;

    @ApiProperty({ example: "https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/*", description: "URL of the picture source" })
    @Prop()
    picture: string;

    @ApiProperty({ example: "https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/*", description: "URL of the head audio source" })
    @Prop()
    audio: string;

    @ApiProperty({ example: "{63ff69f93e2a577dcff552d0,63ff6a1ae0745ebaf548e0c0}", description: "Comment" })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];



}

export const TrackSchema = SchemaFactory.createForClass(Track);