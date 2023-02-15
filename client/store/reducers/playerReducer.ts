import { ITrack } from "types/track";
import {PlayerAction, PlayerActionTypes, PlayerState} from "../../types/player";

const initialState = {
    id:"",
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 10,
    pause: true,
    audioHandler:null
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionTypes.PAUSE:
            return {...state, pause:true}
        case PlayerActionTypes.PLAY:
            return {...state, pause:false}
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}
        case PlayerActionTypes.SET_VOLUME:
            return {...state, volume: action.payload}
        case PlayerActionTypes.SET_DURATION:
            return {...state, duration: action.payload}
        case PlayerActionTypes.SET_ACTIVE:
            return {...state,id:action.payload._id,active: action.payload, duration: 0, currentTime: 0}
        case PlayerActionTypes.SET_CURRENT_AUDIO:
            return {...state, audioHandler: action.payload}    
        default:
            return state

    }
}