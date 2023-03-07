import {Body, Injectable, Post} from '@nestjs/common';
import {CreateUserDto} from "../user/dto/create-user";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {

    constructor(private userService: UserService) {
    }

    async login(userDto: CreateUserDto){

    }


    async registration(userDto: CreateUserDto){

    }

}
