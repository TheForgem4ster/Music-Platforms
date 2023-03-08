import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schemas";
import { Model } from "mongoose";
import { UserModule } from "./user.module";
import { CreateUserDto } from "./dto/create-user";
import { RolesModule } from "src/roles/roles.module";
import { Role } from "src/roles/schemas/roles.schemas";
import {RolesService} from "../roles/roles.service";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserModule>,
                private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        if(!dto.rolesvalue) {
            dto.rolesvalue = "User";
        }
        const role = await this.roleService.getRoleByValue(dto.rolesvalue);
        const user = await this.userModel.create({ ...dto, roles: role.id });
        return user;
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userModel.findOne({"email" : email});
        return user;
    }

    async delete() {

    }

}