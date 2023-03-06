import { Module } from '@nestjs/common';
import {RolesController} from "./roles.controller";
import { RolesService } from './roles.service';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        // MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
    ],
    controllers: [RolesController],
    providers: [RolesService],
})
export class RolesModule {
}
