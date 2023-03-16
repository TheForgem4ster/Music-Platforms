import {Dispatch} from "react";
import {AlbumAction, AlbumActionType} from "../../types/album";
import axios from "axios";
import {searchTracks} from "./track";


export const fetchAlbum = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}album`)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading albums'})
        }
    }
}

export const searchAlbums = (name: string,authorId:string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}albums/search?name=`+name +'&authorId='+authorId)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading albums'})
        }
    }
}

export const deleteAlbum = (id:string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.delete(`${process.env.API_URL}albums/`+id)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while deleting album'})
        }
    }
}