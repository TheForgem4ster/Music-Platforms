import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./schemas/album.schemas";
import { Model } from "mongoose";
import {CreateAlbumDto} from "./dto/create-album.dto";


@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModule: Model<AlbumDocument> ) { }

    async create(dto: CreateAlbumDto) : Promise<Album> {
        const album = await this.albumModule.create({...dto, time: 0, likeCount: 0, dateCreate: Date().toLocaleString(), picture: ''})
        return album;
    }

    async getAll() {

    }

    async getOne(){

    }

    async delete() {
        
    }

}