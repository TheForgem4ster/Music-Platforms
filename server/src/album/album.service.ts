import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./schemas/album.schemas";
import {Model, ObjectId} from "mongoose";
import {CreateAlbumDto} from "./dto/create-album.dto";
import { TrackDocument } from "src/track/schemas/track.schemas";

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModule: Model<AlbumDocument>,
               ) { }

    async create(dto: CreateAlbumDto) : Promise<Album> {
        const album = await this.albumModule.create({...dto, likeCount: 0, dateCreate: Date().toLocaleString(), picture: ''})
        return album;
    }

    async getAll() : Promise<Album[]> {
        const albums = await this.albumModule.find();
        return albums;
    }

    async getOne(id: ObjectId) : Promise<Album>{
        const album = await this.albumModule.findById(id);
        return album;
    }

    async delete(id: ObjectId) : Promise<ObjectId> {
        const album = await this.albumModule.findByIdAndDelete(id);
        return album.id;
    }

   

}