import {Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors} from "@nestjs/common";
import mongoose, { ObjectId } from "mongoose";
import { AlbumService } from "./album.service";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Album } from "./schemas/album.schemas";
import { Track } from "src/track/schemas/track.schemas";

@ApiTags("Album")
@Controller('/album')
export class AlbumController {
    constructor(private albumService: AlbumService,
    ) { }

    @ApiOperation({ summary: "Create Album" })
    @ApiResponse({ status: 200, type: Album })
    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
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

    @ApiOperation({ summary: "Search album" })
    @ApiResponse({ status: 200, type: [Album] })
    @Get('/search')
    search(@Query('name') name: string, @Query('authorId') authorId: string ) {
        return this.albumService.search(name, authorId)
    }

    @ApiOperation({ summary: "Get Album by ID" })
    @ApiResponse({ status: 200, type: Album })
    @Get('index/:id')
    getOne(@Param('id') id: ObjectId) {
        return this.albumService.getOne(id);
    }

    @ApiOperation({ summary: "Get Tracks by Album ID" })
    @ApiResponse({ status: 200, type: [Track] })
    @Get(':id')
    getByAlbumId(@Param('id') id: ObjectId) {
        return this.albumService.getByAlbumId(id);
    }


    @ApiOperation({ summary: "Delete Album by ID" })
    @ApiResponse({ status: 200, type: mongoose.Types.ObjectId })
    @Delete(":id")
    delete(@Param('id') id: ObjectId) {
        console.log(id)
        return this.albumService.delete(id);
    }

    @ApiOperation({ summary: "Delete Track by ID from Album" })
    @ApiResponse({ status: 200, type: mongoose.Types.ObjectId })
    @Delete(":albumId/:trackId")
    deleteTrack(@Param('trackId') trackId: ObjectId, @Param('albumId') albumId: ObjectId) {
        console.log("Hello")
        return this.albumService.deleteTrack(albumId,trackId);
    }

    @ApiOperation({ summary: "Add a track to the album" })
    @ApiResponse({ status: 200, type: Album })
    @Put(':albumId/:trackId')
    addToAlbum(@Param('trackId') trackId: ObjectId, @Param('albumId') albumId: ObjectId) {
        console.log(trackId)
        return this.albumService.addTrack(trackId, albumId)
    }
    @ApiOperation({ summary: "Add or Remove like" })
    @ApiResponse({ status: 200, type: Number })
    @Put("like/:id/:flag")
    addLike(@Param('id')  albumId: ObjectId, @Param('flag')  flag: number) {
        return this.albumService.addRemoveLike(albumId, flag)
    }




    // @Put('search/:trackName')
    // serchTrackNameToAlbum(@Param('trackName') trackName: string){
    //     return this.albumService.searchTrackNameToAlbum(trackName)
    // }

}