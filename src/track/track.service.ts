import { Comment,CommentDocument } from './schemas/comment.schemas';
import { Injectable } from '@nestjs/common';
import { Track, TrackDocument } from './schemas/track.schemas';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from "mongoose";
import { CreateTrackDto } from './dto/create-track.dto';

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

    async getAll() {

    }

    async getOne() {

    }

    async delete() {

    }
}