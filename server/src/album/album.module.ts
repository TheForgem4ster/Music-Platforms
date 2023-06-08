import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, AlbumSchema } from './schemas/album.schemas';
import { TrackModule } from '../track/track.module';
import { S3Service } from '../s3/s3.service';
import { FileService } from '../file storage/file.service';
import { Track, TrackSchema } from 'src/track/schemas/track.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }]),
  ],
  controllers: [AlbumController],
  providers: [AlbumService, S3Service, FileService],
  exports: [
    AlbumService,
    MongooseModule.forFeature([{ name: Album.name, schema: AlbumSchema }]),
  ],
})
export class AlbumModule {}
