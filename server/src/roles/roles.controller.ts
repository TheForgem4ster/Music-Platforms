import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CreateRoleDto } from './dto/create-role';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }
    @Get('/:id')
    getById(@Param('id') id: ObjectId) {
        return this.roleService.getRoleById(id);
    }
}
