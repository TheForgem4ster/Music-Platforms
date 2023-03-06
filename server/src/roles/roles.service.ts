import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateRoleDto } from './dto/create-role';
import { Role, RoleDocument } from './schemas/roles.schemas';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {
    }
    async createRole(dto: CreateRoleDto) {
        const role = await this.roleModel.create(dto);
        return role;
    }
    async getRoleById(id: ObjectId) {
        const role = await this.roleModel.findById(id);
        return role;
    }
}
