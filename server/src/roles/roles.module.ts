import { Module } from '@nestjs/common';
import {RolesController} from "./roles.controller";
import { RolesService } from './roles.service';
import {MongooseModule} from "@nestjs/mongoose";
import { Role, RoleSchema } from './schemas/roles.schemas';

@Module({
    imports: [
         MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}])
    ],
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService]
})
export class RolesModule {
}
