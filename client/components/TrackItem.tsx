import React, {useEffect, useState} from 'react';
import {ITrack} from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";
import {Card, Grid, IconButton} from '@mui/material';
import {Delete, Pause, PlayArrow, VolumeUp} from '@mui/icons-material';
import {useTypedSelector} from "../hooks/useTypedSelector";
import { PlayerState } from 'types/player';
import PlayButton from './PlayButton';


interface TrackItemProps {
    track: ITrack;
    activePlay?: boolean;
}

let audio;

const TrackItem: React.FC<TrackItemProps> = ({track, activePlay = false},key) => {
    const router = useRouter()
   
    const {playTrack, pauseTrack, setActiveTrack,setCurrentTime, setDuration,SetCurrentAudio} = useActions()
    const {id,pause, volume, active,audioHandler} = useTypedSelector(state => state.player)
    
    
    useEffect(() => {
       
            if(active)
            {
                if (!audio) {
                    audio = new Audio();
                    setAudio()
                    
                } 
            }
       
     }, [active])
    
    useEffect(() => {
    
        if(audioHandler){
            audio =audioHandler
            play()
        }
   
    },[audioHandler])

    const setAudio = () => {
      
        if (active) {
            
            audio.src = 'http://localhost:5000/' + active.audio;
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration)/100)
            }
            
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime)/100)
            }
            
            SetCurrentAudio(audio);
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

   
const play=()=>{
    if (pause) {
        playTrack()
        audio.play()
    } else {
        
        pauseTrack()
        audio.pause()
    }
}
    const check = () => {
      
        if(track._id!==id){
            if(audio&&!pause){
            pauseTrack()
            audio.pause()
            }
            audio=""
            setActiveTrack(track)
        }else{
            play()
        }
        
        // if (!audio) {
        //     audio = new Audio()
        //     setAudio()
        // }
        
        
        
    }

    return (
    
        <Card className={styles.track}>
           
            <IconButton onClick={check}  >
                 
                { 
                    ((track._id===id)&&!pause)
                    ? <Pause/>
                    : <PlayArrow/>
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
