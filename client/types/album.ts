export interface IAlbum {
    _id: string;
    name: string;
    author: string;
    likeCount: number;
    dateCreate: Date;
    picture: string;
    track: string[];
}