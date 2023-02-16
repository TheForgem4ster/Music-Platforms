import {TrackAction, TrackActionTypes, TrackState} from "../../types/track";

const initialState: TrackState = {
    id: '',
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
    switch (action.type) {
        case TrackActionTypes.FETCH_TRACKS_ERROR:
            return {...state, error: action.payload}
        case TrackActionTypes.FETCH_TRACKS:
            return {error: '', tracks: action.payload, id: ''}
        case TrackActionTypes.DELETE_TRACKS:
            return {...state, id: action.payload}
        default:
            return state
    }
}
