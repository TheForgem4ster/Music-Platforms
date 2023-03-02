import {ObjectId} from "mongoose";

export class CreateAlbumDto {
    readonly name;
    readonly authorId: ObjectId;
    readonly time;
    readonly likeCount;
    readonly dateCreate;
    readonly picture;
}