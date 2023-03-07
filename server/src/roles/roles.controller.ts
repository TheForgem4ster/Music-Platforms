import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { CreateRoleDto } from './dto/create-role';
import { RolesService } from './roles.service';
import { Role } from './schemas/roles.schemas';
@ApiTags("Roles")
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    @ApiOperation({ summary: "Create role" })
    @ApiResponse({ status: 200, type: Role })
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }
    @ApiOperation({ summary: "Get role by ID" })
    @ApiResponse({ status: 200, type: mongoose.Schema.Types.ObjectId })
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }
}
