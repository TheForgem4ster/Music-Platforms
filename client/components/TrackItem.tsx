import React, {useEffect} from 'react';
import {ITrack} from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {Play} from "@next/font/google";
import Player from "./Player";
import {Card, Grid, IconButton} from '@mui/material';
import {Delete, Pause, PlayArrow} from '@mui/icons-material';
import {useTypedSelector} from "../hooks/useTypedSelector";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

let audio;


const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()

    const {setCurrentTime, setDuration} = useActions()
    const {activePlay, volumepause, pause, volume} = useTypedSelector(state => state.player)


    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            setAudio()
            play()
        } else {
            setAudio()
            play()
        }
    }, [activePlay])

    const setAudio = () => {
        if (activePlay) {
            audio.src = 'http://localhost:5000/' + activePlay.audio;
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    // const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     audio.volume = Number(e.target.value) / 100
    //     setVolume(Number(e.target.value))
    // }
    // const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     audio.currentTime = Number(e.target.value)
    //     setCurrentTime(Number(e.target.value))
    // }

    const play = () => {
        // e.stopPropagation()
        setActiveTrack(track)
        playTrack()


    }

    const check = () => {
        if (pause) {
            setActiveTrack(track)
            playTrack()
            audio.play()
        } else {
            setActiveTrack(false)
            pauseTrack()
            audio.pause()
        }
    }

    return (
        <Card className={styles.track}>
            <IconButton onClick={check}>
                {/*{!active*/}
                {/*    ? <PlayArrow/>*/}
                {/*    : <Pause/>*/}
                {/*}*/}
                {!active && !pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>

            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {/*{active && <div>02:42 / 03:22</div>}*/}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;
