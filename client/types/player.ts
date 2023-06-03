import {ITrack} from "./track";

export interface PlayerState {
    active: null | ITrack;
    volume: number;
    duration: number;
    currentTime: number;
    pause: boolean;
    repeat:number;
    id?: string;
    audioHandler: null | HTMLAudioElement;
    playlist:ITrack[];
}

export enum PlayerActionTypes {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE",
    SET_DURATION = "SET_DURATION",
    SET_CURRENT_TIME = "SET_CURRENT_TIME",
    SET_VOLUME = "SET_VOLUME",
    SET_CURRENT_AUDIO="SET_CURRENT_AUDIO",
    SET_CURRENT_PLAYLIST="SET_CURRENT_PLAYLIST",
    SET_REPEAT = "SET_REPEAT"
}

interface PlayAction {
    type: PlayerActionTypes.PLAY
}
interface PauseAction {
    type: PlayerActionTypes.PAUSE
}
interface SetActiveAction {
    type: PlayerActionTypes.SET_ACTIVE,
    payload: ITrack;
}
interface SetDurationAction {
    type: PlayerActionTypes.SET_DURATION,
    payload: number;
}
interface SetVolumeAction {
    type: PlayerActionTypes.SET_VOLUME,
    payload: number;
}
interface SetCurrentTimeAction {
    type: PlayerActionTypes.SET_CURRENT_TIME,
    payload: number;
}
interface SetCurrentAudio{
    type: PlayerActionTypes.SET_CURRENT_AUDIO,
    payload: HTMLAudioElement;
}
interface SetCurrentPlaylist{
    type: PlayerActionTypes.SET_CURRENT_PLAYLIST,
    payload: ITrack[];
}
interface SetRepeat {
    type: PlayerActionTypes.SET_REPEAT,
    payload: number;
}
export type PlayerAction =
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction
    | SetCurrentAudio
    | SetCurrentPlaylist
    | SetRepeat
