import {Dispatch} from "react";
import {AlbumAction, AlbumActionType} from "../../types/album";
import axios from "axios";
import {searchTracks} from "./track";


export const fetchAlbum = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}albums`)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading albums'})
        }
    }
}

export const searchAlbum = (query: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}albums`)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading albums'})
        }
    }
}

export const fetchAlbum = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}albums`)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading albums'})
        }
    }
}