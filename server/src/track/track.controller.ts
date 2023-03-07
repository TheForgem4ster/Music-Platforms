import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UploadedFiles, Query, Put } from '@nestjs/common';
import mongoose, { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrackService } from './track.service';
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './schemas/track.schemas';
import { Comment } from './schemas/comment.schemas';

@ApiTags("Tracks")
@Controller('/tracks')
export class TrackController {

    constructor(private trackService: TrackService) { }

    @ApiOperation({ summary: "Create Track" })
    @ApiResponse({ status: 200, type: Track })
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateTrackDto) {
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    }

    @ApiOperation({ summary: "Get all tracks" })
    @ApiResponse({ status: 200, type: [Track] })
    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.trackService.getAll(count, offset);
    }

    @ApiOperation({ summary: "Search tracks" })
    @ApiResponse({ status: 200, type: [Track] })
    @Get('/search')
    search(@Query('query') query: string) {
        return this.trackService.search(query)
    }

    @ApiOperation({ summary: "Get track by ID" })
    @ApiResponse({ status: 200, type: Track })
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.trackService.getOne(id);
    }

    @ApiOperation({ summary: "Delete track by ID" })
    @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    }

    @ApiOperation({ summary: "Add comment to the track" })
    @ApiResponse({ status: 200, type: Comment })
    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    }

    @ApiOperation({ summary: "Add listen" })
    @ApiResponse({ status: 200, type: null })
    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    }


}