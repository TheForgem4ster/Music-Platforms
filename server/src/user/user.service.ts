import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/user.schemas";
import {Model} from "mongoose";
import {UserModule} from "./user.module";
import {CreateUserDto} from "./dto/create-user";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserModule>) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userModel.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userModel.find();
        return users;
    }

    async getOne(){

    }

    async delete() {

    }

}