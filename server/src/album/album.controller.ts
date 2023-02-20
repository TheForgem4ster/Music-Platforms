import {Body, Controller, Get, Post} from "@nestjs/common";
import {AlbumService} from "./album.service";
import {CreateAlbumDto} from "./dto/create-album.dto";

@Controller('/album')
export class AlbumController {
    constructor(private albumService:  AlbumService) { }
    @Post()
    create(@Body() dto: CreateAlbumDto) {
        return this.albumService.create(dto);
    }
    @Get()
    getAll() {
        return 'Илья ты что клоун?';
    }

    getOne(){

    }

    delete() {

    }
}

