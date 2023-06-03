import { VolumeUp } from "@mui/icons-material";
import { Box } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import styles from "../../styles/Player.module.scss";
import VolumeScrollBar from "../Main/ListTrack/VolumeScrollBar";
import ButtonPlayerGroup from "./ButtonPlayerGroup";
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import ScrollBar from "../ScrollBar";
import {
    play,
    next,
    prev,
    repeat,
    shuffle
} from '../../misc/AudioController';

let audio


const Player = () => {
    const theme = useTheme();
    const [position, setPosition] = React.useState(32);
    const context = useTypedSelector(state => state.player)
    const {tracks} = useTypedSelector(state => state.track)
    const actionContext = useActions()
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    const leftIcon = formatTime(context.currentTime)
    const rightIcon = formatTime(context.duration)

    useEffect(() => {
        if (context.audioHandler) {
            audio = context.audioHandler
            
            if (context.currentTime <= 0){
                
                play(context,audio,actionContext,tracks)}
        }
    }, [context.audioHandler])

    // const play = () => {
    //     if (active) {
    //         audio.onloadedmetadata = () => {
    //             setDuration(Math.ceil(audio.duration))
    //         }
    //         audio.ontimeupdate = () => {
    //             setCurrentTime(Math.ceil(audio.currentTime))
    //         }
    //         if (pause) {
    //             playTrack()
    //             audio.play()
    //         } else {
    //             pauseTrack()
    //             audio.pause()
    //         }

    //     }
    // }
    const handlePressPlay= () =>{
        play(context,audio,actionContext)
    }
    const handlePressNext = () => {
        next(audio,context,actionContext)
    }
    const handlePressPrev = () => {
        prev(audio,context,actionContext)
    }
    const handlePressRepeat = () => {
    
        repeat(context,audio,actionContext)
    }
    const handlePressShuffle = () => {
    
        shuffle(context,actionContext)
    }
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(audio)
        audio.volume = Number(e.target.value) / 100
        actionContext.setVolume(Number(e.target.value))
    }
    const changeCurrentTime = (value: Number) => {
        if(audio)
        audio.currentTime = Number(value)
        actionContext.setCurrentTime(Number(value))
    }


    return (
        <div className={styles.player}>
            <img src={context.active?.picture !== undefined ? process.env.API_URL + context.active?.picture :
                'https://img.freepik.com/free-photo/curvy-creative-abstract-wavy-effects-color-curves-flow-minimalist-luxury-stylish-trendy-colorful-wav_1258-150872.jpg'}
                style={{ height: 35 }} />

            <Grid container direction="column" style={{ display: "block", width: 200, margin: '0 20px' }}>
                <div>{context.active?.name}</div>
                <div style={{ fontSize: 13}}>{context.active?.artist}</div>
            </Grid>

            <ButtonPlayerGroup play={handlePressPlay} 
            pause={context.pause} next={handlePressNext} 
            previous={handlePressPrev} 
            repeat={handlePressRepeat}
            shuffle={handlePressShuffle}
            repeatCount={context.repeat}/>
            <Box sx={{ width: 400, display: "flex",  margin: "0 auto" }}>
                <ScrollBar duration={context.duration} position={context.currentTime} theme={theme}
                    onChangeSetPosition={(_, value) => changeCurrentTime(value as number)} />
            </Box>

            <div className={styles.volume}>
                <VolumeUp />
                <VolumeScrollBar left={context.volume} right={100} onChange={changeVolume} />
            </div>
        </div>
    );
};

export default Player;