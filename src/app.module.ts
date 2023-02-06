import { TrackModule } from './track/track.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports: [
        MongooseModule.forFeature('mongodb+srv://admin:admin@cluster0.wyas4iw.mongodb.net/music-platform?retryWrites=true&w=majority'),
        TrackModule,
    ],
})
export class AppModule {

}