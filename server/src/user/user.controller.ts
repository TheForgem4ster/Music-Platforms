import {Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./schemas/user.schemas";
import {RolesGuard} from "../auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";

@ApiTags("Users")
@Controller('/user')
export class UserController {

    constructor(private userService: UserService) { }

    @ApiOperation({summary: "Create user"})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
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

    @ApiOperation({summary: "Issue a role"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    getOne(){

    }

    delete() {

    }
}