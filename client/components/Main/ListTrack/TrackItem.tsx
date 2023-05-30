import React, {useEffect, useState} from 'react';
import {ITrack} from "../../../types/track";
import styles from '../../../styles/TrackItem.module.scss'
import {useRouter} from "next/router";
import {useActions} from "../../../hooks/useActions";
import {Avatar, Card, Grid, IconButton} from '@mui/material';
import {Delete, Pause, PlayArrow, VolumeUp} from '@mui/icons-material';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from 'react-redux';
import {NextThunkDispatch} from "../../../store";
import {deleteTracks, fetchTracks} from "../../../store/action-creators/track";
import {play, setAudio} from '../../../misc/AudioController';
import {useFetcher} from "../../../hooks/useFetcher";

interface TrackItemProps {
    track: ITrack;
    key: number;
}

let audio;

const TrackItem: React.FC<TrackItemProps> = ({track,key}) => {
    const router = useRouter()
    const actionContext = useActions()

    const context = useTypedSelector(state => state.player)
    const {tracks} = useTypedSelector(state => state.track)
    useEffect(() => {
        if (context.active) {
            if (!audio) {
                audio = new Audio();
                setAudio(audio,context.active,context.volume,actionContext.SetCurrentAudio)
                console.log(context.active)
            }
        }
    }, [context.active])

    // const setAudio = () => {
    //     audio.src =process.env.API_URL+ active.audio;
    //     audio.volume = volume / 100
    //     SetCurrentAudio(audio);
    // }

    const check = () => {
        if (track._id !== context.id ) {
           
            if (audio && !context.pause) {
                actionContext.pauseTrack()
                audio.pause()
            }
            audio = ""
            actionContext.setActiveTrack(track)
           
        } else {
            if(!context.active){
              actionContext.setActiveTrack(track)}
              
            audio = context.audioHandler
            play(context,audio,actionContext,tracks)
           
            // if (pause) {
            //     audio = audioHandler
            //     playTrack()
            //     audio.play()
            //     SetCurrentAudio(audio)

            // } else {
            //     pauseTrack()
            //     audio = audioHandler
            //     audio.pause()
            // }

        }
    }
    const dispatch = useDispatch() as NextThunkDispatch;

    const onDeleteTrack = async () => {
        dispatch(deleteTracks(track._id));
        // window.location.reload();
    }
    const newPages = (e) => {
        e.stopPropagation()
        check();
    }

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    const leftIcon = formatTime(context.currentTime)
    const rightIcon = formatTime(context.duration)

    const imageUrl = process.env.API_URL+track.picture;
    const defaultImageUrl = 'https://st4.depositphotos.com/1741969/21318/i/600/depositphotos_213182702-stock-photo-abstract-magical-image-firefly-flying.jpg';


    return (
            <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>

                <IconButton onClick={newPages} size={'small'} disableRipple={true} >
                    {
                        ((track._id === context.id) && !context.pause)
                            ? <Avatar sx={{ bgcolor:'#4048c4', width: 40, height: 40 }}><Pause color="action"/></Avatar>
                            : <Avatar sx={{ bgcolor:'transparent', width: 40, height: 40 }}><PlayArrow color="action"/></Avatar>
                    }
                </IconButton>
                <img width={55} height={55} src={imageUrl}
                     style={{borderRadius: 50}}
                     onError={(e) => {
                         e.target.src = defaultImageUrl;

                     }}/>
                <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                    <div>{track.name}</div>
                    <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
                </Grid>
                {((track._id === context.id) ? (<div>
                    {leftIcon} - {rightIcon}</div>) : (<div/>))}
                <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                    <Delete onClick={onDeleteTrack}/>
                </IconButton>
            </Card>

    );
};

export default TrackItem;
