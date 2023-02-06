import { Comment,CommentDocument } from './schemas/comment.schemas';
import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schemas';
import { InjectModel } from '@nestjs/mongoose';
import {Model, ObjectId} from "mongoose";
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()

export class TrackService {

    constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
                @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
                ) {}

    async create (dto: CreateTrackDto): Promise<Track> {
        // const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
        // const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
        const track = await this.trackModel.create({...dto, listens: 0});
        
        return track;
    }

    async getAll(): Promise<Track[]>{
        const tracks = await this.trackModel.find();
        return tracks;
}
 
    async getOne(id: ObjectId ): Promise<Track> {
        const track = await this.trackModel.findById(id).populate('comments');
        return track;
    }

    async delete(id:ObjectId): Promise<ObjectId> {
        const track = await this.trackModel.findByIdAndDelete(id);
        return track.id;
    }

    async addComment(dto:CreateCommentDto):Promise<Comment>{
        const track = await this.trackModel.findById(dto.trackId);
        const comment = await this.commentModel.create({...dto})
        track.comments.push(comment.id);
        await track.save();
        return comment;
    }
}