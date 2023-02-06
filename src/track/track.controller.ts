import { Controller, Get } from '@nestjs/common';


@Controller('/track')

export class TrackController {
    create (){

    }

    getAll() {

    }

    @Get()
    getOne() {
        return 'work';
    }

    delete() {

    }
}