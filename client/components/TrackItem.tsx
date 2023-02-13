import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { Card, Grid, IconButton } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ITrack } from "types/track";
import styles from "../styles/TrackItem.module.scss";

interface TrackItemProps {
    track: ITrack;
    
}
let audio;
    const TrackItem: React.FC<TrackItemProps> = ({track}) => {
    const router = useRouter();
    const {pause, volume,active, duration, currentTime} = useTypedSelector(state => state.player)//здесь мы узнаем информацию о состоянии трека в нашем конетексте
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()//обращается к нашим событим ActionCreator

    useEffect(() => {
        if (!audio) {
            audio = new Audio()
            setAudio()
            play()
        } else {
            setAudio()
            play()
        }
    }, [active])
    
    const setAudio = () => {
        if (active) {
            audio.src =  'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }
    const play = () => {//наш трек подключается к Player
        setActiveTrack(track)
        playTrack()
        e.stopPropagation()
        
        
    }

    return (

        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
            {pause
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            {/* {active && <div>02:42 / 03:22</div>} */}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    )
}

export default TrackItem;