import {Controller, Get} from "@nestjs/common";

@Controller('/user')
export class UserController {
    create() {

    }
    @Get()
    getAll() {
        return 'max ты что клоун?';
    }

    getOne(){

    }

    delete() {

    }
}