import { MongooseModule } from '@nestjs/mongoose';
import { TrackService } from './track.service';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { Track, TrackSchema } from './schemas/track.schemas';
import { Comment,CommentSchema } from './schemas/comment.schemas';
import { S3Service } from 'src/s3/s3.service';
import { AlbumModule } from 'src/album/album.module.ts';
import { AlbumService } from 'src/album/album.service';
import { AlbumController } from 'src/album/album.controller';
import { Album, AlbumSchema } from 'src/album/schemas/album.schemas';

@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService, S3Service],
})

export class TrackModule {
    
}