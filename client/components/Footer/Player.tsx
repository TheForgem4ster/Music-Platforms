import {VolumeUp} from "@mui/icons-material";
import {Box, IconButton, Slider} from "@mui/material";
import {useActions} from "hooks/useActions";
import {useTypedSelector} from "hooks/useTypedSelector";
import React, {useEffect} from "react";
import styles from "../../styles/Player.module.scss";
import TrackProgress from "../Main/ListTrack/TrackProgress";
import ButtonPlayerGroup from "./ButtonPlayerGroup";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

let audio

const Player = () => {
    const {pause, volume, active, duration, currentTime, audioHandler} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration} = useActions()
    const formatTime = (seconds: number) =>{
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    const leftIcon = formatTime(currentTime)
    const rightIcon = formatTime(duration)

    useEffect(() => {
        if (audioHandler) {
            audio = audioHandler
            play()
        }
    }, [audioHandler])

    const play = () => {
        if (active) {
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
            if (pause) {
                playTrack()
                audio.play()
            } else {
                pauseTrack()
                audio.pause()
            }

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

    return (
        <div className={styles.player}>
                <IconButton>
                    <img src={"https://cdn-icons-png.flaticon.com/512/73/73511.png"} style={{height: 30}}/>
                </IconButton>
                <Grid container direction="column" style={{display: "block", width: 50, margin: '0 20px'}}>
                    <div>{active?.name}</div>
                    <div style={{fontSize: 12, color: 'gray'}}>{active?.artist}</div>
                </Grid>

                <ButtonPlayerGroup play={play} pause={pause} />
                <Box width={500}>
                    <TrackProgress left={currentTime} right={duration}
                                   leftIcon={leftIcon}
                                   rightIcon={rightIcon} onChange={changeCurrentTime}
                    />
                </Box>
                {/*<TrackProgress left={currentTime} right={duration}*/}
                {/*               leftIcon={leftIcon}*/}
                {/*               rightIcon={rightIcon} onChange={changeCurrentTime}/>*/}
                <VolumeUp />
                    {/*style={{marginLeft: 'auto'}}*/}
                <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    );
};

export default Player;