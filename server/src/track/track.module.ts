import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { Track, TrackSchema } from './schemas/track.schemas';
import { Comment, CommentSchema } from './schemas/comment.schemas';
import { S3Service } from 'src/s3/s3.service';
import { FileService } from '../file storage/file.service';
import { TrackService } from './track.service';

import { AlbumService } from 'src/album/album.service';
import { AlbumModule } from 'src/album/album.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    AlbumModule,
  ],
  controllers: [TrackController],
  providers: [TrackService, S3Service, FileService, AlbumService, AlbumModule],
})
export class TrackModule {}
