import {Module} from "@nestjs/common";
import {AlbumController} from "./album.controller";
import {AlbumService} from "./album.service";
import {MongooseModule} from "@nestjs/mongoose";
import {Album, AlbumSchema} from "./schemas/album.schemas";
import {TrackModule} from "../track/track.module";


@Module({
    imports: [
        MongooseModule.forFeature([{name: Album.name, schema: AlbumSchema}]),
    ],
    controllers: [AlbumController],
    providers: [AlbumService],
    exports: [AlbumService]
})

export class AlbumModule { }