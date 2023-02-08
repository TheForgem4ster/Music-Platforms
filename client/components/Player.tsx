import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import { ITrack } from "types/track";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";


let audio;

const Player = () => {
    const track: ITrack =  {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "http://localhost:5000/audio/2e1b0f2d-74ac-45ba-ace7-82fa3147dd2b.jpg", picture: "http://localhost:5000/image/657ae529-3ae0-4c8f-a873-8107062942ab.jpg", comments: []}
    
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
   
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
        if(active){
            audio.src = active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata =() => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate =() => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if(!active){
        return null;
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{active?.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
    )
}

export default Player;