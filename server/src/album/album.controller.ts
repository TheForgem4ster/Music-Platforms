import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import mongoose, { ObjectId } from "mongoose";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Album } from "./schemas/album.schemas";
import {Track} from "../track/schemas/track.schemas";
@ApiTags("Album")
@Controller('/album')
export class AlbumController {
    constructor(private albumService: AlbumService,
    ) { }

    @ApiOperation({ summary: "Create Album" })
    @ApiResponse({ status: 200, type: Album })
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateAlbumDto) {
        console.log(files);
        const { picture } = files;
        return this.albumService.create(dto, picture[0]);
    }

    @ApiOperation({ summary: "Get all Albums" })
    @ApiResponse({ status: 200, type: [Album] })
    @Get()
    getAll() {
        return this.albumService.getAll()
    }

    @ApiOperation({ summary: "Search albums" })
    @ApiResponse({ status: 200, type: [Album] })
    @Get('/search')
    search(@Query('name') name: string, @Query('authorId') authorId: string ) {
        return this.albumService.search(name, authorId)
    }

    @ApiOperation({ summary: "Get Album by ID" })
    @ApiResponse({ status: 200, type: Album })
    @Get(":id")
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @ApiOperation({ summary: "Delete Album by ID" })
    @ApiResponse({ status: 200, type: mongoose.Types.ObjectId })
    @Delete(":id")
    delete(@Param('id') id: ObjectId) {
        return this.albumService.delete(id);
    }

    @ApiOperation({ summary: "Add a track to the album" })
    @ApiResponse({ status: 200, type: Album })
    @Put(':albumId/:trackId')
    addToAlbum(@Param('trackId') trackId: ObjectId, @Param('albumId') albumId: ObjectId) {
        return this.albumService.addTrack(trackId, albumId)
    }

}

