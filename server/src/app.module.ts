import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import {AlbumModule} from "./album/album.module.ts";
import {UserModule} from "./user/user.module";
import {S3Module} from "../s3/s3.module";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.ofndcvj.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
        FileModule,
        AlbumModule,
        UserModule,
        S3Module
    ],
})
export class AppModule {

}