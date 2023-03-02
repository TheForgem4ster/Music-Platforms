import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { ObjectId } from "mongoose";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";
import {TrackService} from "../track/track.service";

@Controller('/album')
export class AlbumController {
    constructor(private albumService:  AlbumService,
                private trackService:  TrackService) { }
    @Post()
    create(@Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto);
    }
    @Get()
    getAll() {
        return this.albumService.getAll()
    }

    @Get(":id")
    getOne(@Param('id') id: ObjectId){
        return this.albumService.getOne(id);
    }

    @Delete(":id")
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }

    @Put(":id")
    updateTrackAlbum(@Param('id') id: ObjectId){

        return this.albumService.updateTrackAlbum(id);
    }
}

