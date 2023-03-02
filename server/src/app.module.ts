import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumModule} from "./album/album.module.ts";
import {UserModule} from "./user/user.module";
import {S3Module} from "./s3/s3.module";
import { ConfigModule, ConfigService } from '@nestjs/config';

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
        S3Module
        
    ],
})
export class AppModule {

}