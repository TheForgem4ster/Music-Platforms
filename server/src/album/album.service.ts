import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Album, AlbumDocument} from "./schemas/album.schemas";
import {Model, ObjectId} from "mongoose";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {Track, TrackDocument} from "src/track/schemas/track.schemas";
import {S3Service} from "../s3/s3.service";
import {FileService, FileType} from "../file delete later/file.service";

@Injectable()
export class AlbumService {

    constructor(@InjectModel(Album.name) private albumModule: Model<AlbumDocument>,
                private s3Service: S3Service,  private fileService: FileService) {
    }

    async create(dto: CreateAlbumDto, picture): Promise<Album> {
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const album = await this.albumModule.create({
            ...dto,
            likeCount: 0,
            dateCreate: Date().toLocaleString(),
            picture: picturePath,
            genres: dto.genres,
        })
        console.log(album)
        return album;
    }

    async getAll(): Promise<Album[]> {
        const albums = await this.albumModule.find();
        return albums;
    }

    async getOne(id: ObjectId): Promise<Album> {
        const album = await this.albumModule.findById(id);
        return album;
    }

    async delete(id: ObjectId): Promise<ObjectId> {
        const album = await this.albumModule.findByIdAndDelete(id);
        return album.id;
    }

    async addTrack(trackId: ObjectId, albumId: ObjectId): Promise<Album>{
        const album = await this.albumModule.findById(albumId);
        console.log(album)
        if (!album.tracks.includes(trackId)) {
            album.tracks.push(trackId)
        }
        album.save()
        return album
    }

    async search(name: string, authorId: string): Promise<Album[]> {

        const albums = await this.albumModule.find({
            name: { $regex: new RegExp(name, 'i') },
            authorId: { $regex: new RegExp(authorId, 'i')},
        })

        return albums;
    }
}