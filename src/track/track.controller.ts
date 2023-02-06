import { Controller, Get, Post, Body,Param,Delete } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';


@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {    }
    
    @Post()
     create (@Body() dto: CreateTrackDto){     
        return this.trackService.create(dto);
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
}