import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file delete later/file.module';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumModule} from "./album/album.module.ts";
import {UserModule} from "./user/user.module";
import {S3Module} from "./s3/s3.module";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            envFilePath: '.env',
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot(process.env.CONNECT),
        TrackModule,
        AlbumModule,
        UserModule,
        S3Module,
        RolesModule
    ],
    
})
export class AppModule {

}