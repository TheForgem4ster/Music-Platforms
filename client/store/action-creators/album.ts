import {Dispatch} from "react";
import {AlbumAction, AlbumActionType} from "../../types/album";
import axios from "axios";

export const fetchAlbum = () => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}album`)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading album'})
        }
    }
}

export const searchAlbums = (name: string, authorId: string = '', genres: string = '') => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}album/search?name=`+
                name +'&authorId='+ authorId + '&genres' + genres)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading album'})
        }
    }
}

export const getSpecificAlbum = (id: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}album/` + id)
            dispatch({type: AlbumActionType.FETCH_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.FETCH_ALBUM_ERROR,
                payload: 'An error occurred while loading the album from the id' + id})
        }
    }
}


export const deleteAlbum = (id: string) => {
    return async (dispatch: Dispatch<AlbumAction>) => {
        try {
            const response = await axios.delete(`${process.env.API_URL}album/`+id)
            dispatch({type: AlbumActionType.DELETE_ALBUM, payload: response.data})
        } catch(e) {
            dispatch({
                type: AlbumActionType.DELETE_ALBUM,
                payload: 'An error occurred while deleting album'})
        }
    }
}

export const addLike = async (id: string) => {
    try {
      const response = await axios.put(`${process.env.API_URL}album/` + id);
      return response.data;
    } catch (e) {
      console.log("An error occurred while adding like");
    }
  };
  export const addTrackToAlbum = async (Aid: string, Tid: string) => {
    try {
      const response = await axios.put(`${process.env.API_URL}album/` + Aid+'/'+Tid);
      return response.data;
    } catch (e) {
      console.log("An error occurred while adding track to album");
    }
  };