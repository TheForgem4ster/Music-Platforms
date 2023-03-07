import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schemas";
import { Role, RoleSchema } from "src/roles/schemas/roles.schemas";
import {RolesModule} from "../roles/roles.module";



@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        RolesModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {

}