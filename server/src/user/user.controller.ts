import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./schemas/user.schemas";
import {RolesGuard} from "../auth/roles.guard";
import { Roles } from "src/auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import mongoose, { ObjectId } from "mongoose";

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

    @ApiOperation({summary: "Issue a role"})
    @ApiResponse({status: 200})
    @Roles('Admin')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({ summary: "Get user by ID" })
    @ApiResponse({ status: 200, type: User })
    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.userService.getOne(id);
    }

    @ApiOperation({ summary: "Delete user by ID" })
    @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.userService.delete(id);
    }
}