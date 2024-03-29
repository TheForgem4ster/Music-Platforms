import { Comment, CommentDocument } from './schemas/comment.schemas';
import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file storage/file.service';
import { S3Service } from 'src/s3/s3.service';
import { Album, AlbumDocument } from 'src/album/schemas/album.schemas';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    private s3Service: S3Service,
    private fileService: FileService,
  ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio); //s3Service.uploadFile(audio, "tracks")
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    // console.log('sdsd')
    // console.log((audioPath).toString())
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });

    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));

    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    await this.albumModel.updateMany({ tracks: id }, { $pull: { tracks: id } });
    const track = await this.trackModel.findByIdAndDelete(id);
    await this.fileService.removeFile(track.audio);
    await this.fileService.removeFile(track.picture);
    return track.id;
  }

  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment.id);
    await track.save();
    return comment;
  }

  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
