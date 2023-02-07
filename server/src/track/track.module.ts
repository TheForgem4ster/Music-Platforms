import { MongooseModule } from '@nestjs/mongoose';
import { TrackService } from './track.service';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { Track, TrackSchema } from './schemas/track.schemas';
import { Comment,CommentSchema } from './schemas/comment.schemas';
import { FileModule } from 'src/file/file.module';
import { FileService } from 'src/file/file.service';



@Module({
    imports: [
        MongooseModule.forFeature([{name: Track.name, schema: TrackSchema}]),
        MongooseModule.forFeature([{name: Comment.name, schema: CommentSchema}]),
    ],
    controllers: [TrackController],
    providers: [TrackService, FileService],
})

export class TrackModule {
    
}