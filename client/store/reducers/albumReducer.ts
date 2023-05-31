import {AlbumAction, AlbumActionType, AlbumState} from "../../types/album";

const initialState: AlbumState = {
    id: '',
    albums: [],
    errorAlbum: ''
   
}

export const albumReducer = (state = initialState, action: AlbumAction) : AlbumState => {
    switch (action.type){
        case AlbumActionType.FETCH_ALBUM_ERROR:
            return {...state, errorAlbum: action.payload}
        case AlbumActionType.FETCH_ALBUM:
            return {errorAlbum: '', albums: action.payload, id: ''}
        case AlbumActionType.DELETE_ALBUM:
            return {...state, id: action.payload}
        default:
            return state;
    }
}