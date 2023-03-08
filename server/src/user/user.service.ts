import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {User, UserDocument} from "./schemas/user.schemas";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private roleService: RolesService) { }

    async createUser(dto: CreateUserDto) {
        if(!dto.rolesvalue) {
            dto.rolesvalue = "User";
        }
        const user = await this.userModel.create({ ...dto});
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

    async addRole(dto: AddRoleDto): Promise<User> {
        console.log(dto)
        const user = await this.userModel.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);

        if(user && role){
            await user.roles.push(dto.value);
            await user.save();
            return user;
        }
        throw new HttpException("User and Role undefined", HttpStatus.NOT_FOUND);
    }
}