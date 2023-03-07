import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schemas/user.schemas";
import { Model } from "mongoose";
import { UserModule } from "./user.module";
import { CreateUserDto } from "./dto/create-user";
import { RolesModule } from "src/roles/roles.module";
import { Role } from "src/roles/schemas/roles.schemas";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserModule>,
        @InjectModel(Role.name) private rolesModel: Model<RolesModule>) { }

    async createUser(dto: CreateUserDto) {
        const role = await this.rolesModel.findOne({ "value": dto.rolesvalue });
        const user = await this.userModel.create({ ...dto, roles: role.id });
        return user;
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async getOne() {

    }

    async delete() {

    }

}