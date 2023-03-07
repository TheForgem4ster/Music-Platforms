import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schemas";
import { Role, RoleSchema } from "src/roles/schemas/roles.schemas";



@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {

}