import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./schemas/user.schemas";
import {JwtAuthGuart} from "../auth/jwt-auth.guart";
import {RolesGuard} from "../auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";

@ApiTags("Users")
@Controller('/user')
export class UserController {

    constructor(private userService: UserService) { }

    @ApiOperation({summary: "Create user"})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: "Get all users"})
    @ApiResponse({status: 200, type: [User]})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    getOne(){

    }

    delete() {

    }
}