import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import React from "react";
import { ITrack } from "types/track";
import styles from "../styles/Player.module.scss";
import TrackProgress from "./TrackProgress";

const Player = () => {
    const track: ITrack =  {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "https://localhost:5000/audio/", picture: "https://localhost:5000/picture/", comments: []}
  
    const active = false;
    return (
        <div className={styles.player}>
            <IconButton onClick={e => e.stopPropagation()}>
                {!active
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