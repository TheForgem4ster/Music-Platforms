import { Controller, Get, Post, Body,Param,Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TrackService } from './track.service';
import {FileFieldsInterceptor} from "@nestjs/platform-express";


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {    }
    
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
     create (@UploadedFiles() files, @Body() dto: CreateTrackDto){
        const{picture,audio} = files;    
        return this.trackService.create(dto, picture[0], audio[0]);
    }
@Get()
    getAll() {
return this.trackService.getAll();
    }

    @Get(':id')
    getOne(@Param('id')id:ObjectId) {
        return this.trackService.getOne(id);
    }
@Delete(':id')
    delete(@Param('id')id:ObjectId) {
        return this.trackService.delete(id);
    }
@Post('/comment')
addComment(@Body() dto: CreateCommentDto) {
    return this.trackService.addComment(dto);
}
}