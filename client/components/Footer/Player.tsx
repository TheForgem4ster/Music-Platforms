import { VolumeUp } from "@mui/icons-material";
import { Box, IconButton, Slider } from "@mui/material";
import { useActions } from "hooks/useActions";
import { useTypedSelector } from "hooks/useTypedSelector";
import React, { useEffect } from "react";
import styles from "../../styles/Player.module.scss";
import VolumeScrollBar from "../Main/ListTrack/VolumeScrollBar";
import ButtonPlayerGroup from "./ButtonPlayerGroup";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled, useTheme } from '@mui/material/styles';
import ScrollBar from "../ScrollBar";

let audio


const Player = () => {
    const theme = useTheme();
    const [position, setPosition] = React.useState(32);
    const { pause, volume, active, duration, currentTime, audioHandler } = useTypedSelector(state => state.player)
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration } = useActions()
    const formatTime = (seconds: number) => {
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
            if (currentTime <= 0)
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
    const changeCurrentTime = (value: Number) => {
        audio.currentTime = Number(value)
        setCurrentTime(Number(value))
    }

    return (
        <div className={styles.player}>
            <img src={active?.picture !== undefined ? process.env.API_URL + active?.picture :
                'https://img.freepik.com/free-photo/curvy-creative-abstract-wavy-effects-color-curves-flow-minimalist-luxury-stylish-trendy-colorful-wav_1258-150872.jpg'}
                style={{ height: 35 }} />

            <Grid container direction="column" style={{ display: "block", width: 200, margin: '0 20px' }}>
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'black' }}>{active?.artist}</div>
            </Grid>

            <ButtonPlayerGroup play={play} pause={pause} />
            <Box sx={{ width: 400, display: "flex",  margin: "0 auto" }}>
                <ScrollBar duration={duration} position={currentTime} theme={theme}
                    onChangeSetPosition={(_, value) => changeCurrentTime(value as number)} />
            </Box>

            <div className={styles.volume}>
                <VolumeUp />
                <VolumeScrollBar left={volume} right={100} onChange={changeVolume} />
            </div>
        </div>
    );
};

export default Player;