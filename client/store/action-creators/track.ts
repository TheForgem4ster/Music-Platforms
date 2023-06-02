import {Dispatch} from "react";
import {TrackAction, TrackActionTypes} from "../../types/track";
import axios from "axios";


export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}tracks`)
            console.log("dsd"+response.data)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'An error occurred while loading tracks'})
        }
    }
}

export const fetchTracksByAlbum = (id:string) => {
       return async (dispatch: Dispatch<TrackAction>) => {
            try {
                const response = await axios.get(`${process.env.API_URL}album/`+ id)
                console.log("hello")
                console.log(response.data)
                dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
            } catch (e) {
                dispatch({
                    type: TrackActionTypes.FETCH_TRACKS_ERROR,
                    payload: 'An error occurred while loading tracks'})
            }
       }
    }
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.get(`${process.env.API_URL}tracks/search?query=` + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'An error occurred while loading tracks'})
        }
    }
}

export const deleteTracks = (id: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.delete(`${process.env.API_URL}tracks/` + id);
            dispatch({type: TrackActionTypes.DELETE_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'An error occurred while deleting track'})
        }
    }
}

export const deleteTracksInAlbum = (albumId: string, trackId: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const response = await axios.delete(`${process.env.API_URL}album/` + albumId +'/'+trackId);
            console.log(response.data)
            dispatch({type: TrackActionTypes.DELETE_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'An error occurred while deleting track'})
        }
    }
}
