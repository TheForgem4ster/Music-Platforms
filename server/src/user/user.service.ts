import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/user.schemas";
import {Model} from "mongoose";
import {UserModule} from "./user.module";


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserModule>) { }

    async create() {

    }

    async getAll() {

    }

    async getOne(){

    }

    async delete() {

    }

}