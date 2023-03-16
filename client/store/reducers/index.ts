import { trackReducer } from './trackReducer';
import {HYDRATE} from "next-redux-wrapper";
import {combineReducers} from "redux";
import {playerReducer} from "./playerReducer";
import {albumReducer} from "./albumReducer";

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer,
})

export const reducer = (state, action) => {
   
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
            player: (state.player.id!=="")? state.player : action.payload.player
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
};

export type RootState = ReturnType<typeof rootReducer>