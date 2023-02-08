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
    const track: ITrack =  {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "http://localhost:5000/audio/d101ca83-fa70-4616-a589-39fc4e187612.mp3", picture: "http://localhost:5000/image/657ae529-3ae0-4c8f-a873-8107062942ab.jpg", comments: []}
    
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack} = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            audio.src = track.audio
        } 
    }, [])
    const play = () => {
        if (pause) {
            playTrack()
            audio.play()
        } else {
            pauseTrack()
            audio.pause()
        }
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
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <TrackProgress left={0} right={100} onChange={()=>({})}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={0} right={100} onChange={()=>({})}/>
        </div>
    )
}

export default Player;