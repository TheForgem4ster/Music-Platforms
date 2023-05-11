import { ApiProperty } from "@nestjs/swagger";
import {ObjectId} from "mongoose";

export class CreateAlbumDto {
    @ApiProperty({ example: "Album 1", description: "Album name" })
    readonly name;
   
    @ApiProperty({ example: "Maksym", description: "Author name" })
    readonly authorId: ObjectId;
    
    @ApiProperty({ example: "5:46", description: "Total hour of all tracks in this album" })
    readonly time;
    
    @ApiProperty({ example: "1000", description: "Quantity of likes" })
    readonly likeCount;
    
    @ApiProperty({example: "2002-03-21", description: "Date of creation"})
    readonly dateCreate;

    @ApiProperty({example: "Pop", description: "Pop of create"})
    readonly genres;

    @ApiProperty({ example: "https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/*", description: "URL of the picture source" })
    readonly picture;
}