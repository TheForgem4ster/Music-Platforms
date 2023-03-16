import {TrackActionTypes} from "./track";

export interface IAlbum {
    _id: string;
    name: string;
    author: string;
    likeCount: number;
    dateCreate: Date;
    picture: string;
    track: string[];
}

export interface AlbumState {
    id: string;
    albums: IAlbum[];
    error: string;
}
export enum AlbumActionType {
    FETCH_ALBUM = 'FETCH_ALBUM',
    DELETE_ALBUM = 'DELETE_ALBUM',
    FETCH_ALBUM_ERROR = 'FETCH_ALBUM_ERROR',
}

interface DeleteAlbumAction {
    type: AlbumActionType.DELETE_ALBUM,
    payload: string,
}

interface FetchAlbumAction {
    type: AlbumActionType.FETCH_ALBUM,
    payload: IAlbum[];
}
interface FetchAlbumErrorAction {
    type: AlbumActionType.FETCH_ALBUM_ERROR;
    payload: string
}

export type AlbumAction = DeleteAlbumAction | FetchAlbumAction | FetchAlbumErrorAction;