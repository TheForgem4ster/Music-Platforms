import React, {useEffect, useState} from 'react';
import {ITrack} from "../../../types/track";
import styles from '../../../styles/TrackItem.module.scss'
import {useRouter} from "next/router";
import {useActions} from "../../../hooks/useActions";
import {Card, Grid, IconButton} from '@mui/material';
import {Delete, Pause, PlayArrow, VolumeUp} from '@mui/icons-material';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from 'react-redux';
import {NextThunkDispatch} from "../../../store";
import {deleteTracks} from "../../../store/action-creators/track";

interface TrackItemProps {
    track: ITrack;
    activePlay?: boolean;
}

let audio;

const TrackItem: React.FC<TrackItemProps> = ({track, activePlay = false}) => {
    const router = useRouter()

    const {playTrack, pauseTrack, setActiveTrack, SetCurrentAudio} = useActions()
    const {id, pause, volume, active, audioHandler, currentTime, duration} = useTypedSelector(state => state.player)

    useEffect(() => {
        if (active) {
            if (!audioHandler) {
                audio = new Audio();
                setAudio()
            }
        }
    }, [active])

    const setAudio = () => {
        audio.src = active.audio;
        audio.volume = volume / 100
        SetCurrentAudio(audio);
    }

    const check = () => {
        if (track._id !== id) {
            if (audio && !pause) {
                pauseTrack()
                audio.pause()
            }
            audio = ""
            setActiveTrack(track)
            SetCurrentAudio(audio)
        } else {
            if (pause) {
                audio = audioHandler
                playTrack()
                audio.play()
                SetCurrentAudio(audio)

            } else {
                pauseTrack()
                audio = audioHandler
                audio.pause()
            }
        }
    }
    const dispatch = useDispatch() as NextThunkDispatch;
    const [domLoaded, setDomLoaded] = useState(true);

    const onDeleteTrack = async () => {
        dispatch(deleteTracks(track._id));
        setDomLoaded(false);
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

    const leftIcon = formatTime(currentTime)
    const rightIcon = formatTime(duration)

    return (
        <>{domLoaded && (
            <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>

                <IconButton onClick={newPages}>
                    {
                        ((track._id === id) && !pause)
                            ? <Pause/>
                            : <PlayArrow/>
                    }
                </IconButton>
                <img width={70} height={70} src={track.picture}/>
                <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                    <div>{track.name}</div>
                    <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
                </Grid>
                {((track._id === id) ? (<div>
                    {leftIcon} - {rightIcon}</div>) : (<div/>))}
                <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                    <Delete onClick={onDeleteTrack}/>
                </IconButton>
            </Card>
        )}
        </>
    );
};

export default TrackItem;
