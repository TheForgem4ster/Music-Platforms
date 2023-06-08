import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Album, AlbumDocument } from './schemas/album.schemas';
import { Model, ObjectId } from 'mongoose';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Track, TrackDocument } from 'src/track/schemas/track.schemas';
import { S3Service } from '../s3/s3.service';
import { FileService, FileType } from '../file storage/file.service';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name) private albumModule: Model<AlbumDocument>,
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    private s3Service: S3Service,
    private fileService: FileService,
  ) {}

  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    const album = await this.albumModule.create({
      ...dto,
      likeCount: 0,
      dateCreate: Date().toLocaleString(),
      picture: picturePath,
      genres: dto.genres,
    });
    console.log(album);
    return album;
  }

  async getAll(): Promise<Album[]> {
    const albums = await this.albumModule.find();
    return albums;
  }

  async getOne(id: ObjectId): Promise<Album[]> {
    const album = await this.albumModule.findById(id);
    return [album];
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const album = await this.albumModule.findByIdAndDelete(id);
    return album.id;
  }
  async deleteTrack(Aid: ObjectId, Tid: ObjectId): Promise<ObjectId> {
    const album = await this.albumModule.findById(Aid);
    const track =await this.trackModel.findById(Tid)
    const trackIndex = album.tracks.indexOf(track.id);
    if (trackIndex !== -1) {
      album.tracks.splice(trackIndex, 1);
    } else {
      throw new NotFoundException('Track not found in album');
    }
    album.save();
    return Tid;
  }
  async addTrack(trackId: ObjectId, albumId: ObjectId): Promise<Album> {
    const album = await this.albumModule.findById(albumId);
    const track =await this.trackModel.findById(trackId)
    if (!album.tracks.includes(track.id)) {
      album.tracks.push(track.id);
    }
    album.save();
    return album;
  }
  async getByAlbumId(albumId: ObjectId): Promise<Track[]> {
    const album = await this.albumModule.findById(albumId);
    console.log('Album:' + album);
    const tracks = await this.trackModel.find({ _id: { $in: album.tracks } });
    console.log('Tracks:' + tracks);
    return tracks;
  }
  async search(name: string, authorId: string): Promise<Album[]> {
    const albums = await this.albumModule.find({
      name: { $regex: new RegExp(name, 'i') },
      authorId: { $regex: new RegExp(authorId, 'i') },
    });

    return albums;
  }
  async addRemoveLike(albumId: ObjectId, flag: number): Promise<Album> {
    const album = await this.albumModule.findById(albumId);
    if (flag == 1) {
      album.likeCount += 1;
    } else {
      album.likeCount -= 1;
    }
    album.save();
    return album;
  }
}
