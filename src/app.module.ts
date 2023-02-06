import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import * as path from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";

@Module({
    imports: [
        ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.ofndcvj.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
        FileModule
    ],
})
export class AppModule {

}