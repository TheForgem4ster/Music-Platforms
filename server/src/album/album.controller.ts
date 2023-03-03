import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { TrackService } from "../track/track.service";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller('/album')
export class AlbumController {
    constructor(private albumService: AlbumService,
    ) { }
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        console.log(files);
        const { picture } = files;
        return this.albumService.create(dto, picture[0]);
    }
    @Get()
    getAll() {
        return this.albumService.getAll()
    }

    @Get(":id")
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @Delete(":id")
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }



}

