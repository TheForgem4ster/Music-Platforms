import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import ScrollBar from "../../ScrollBar";


const Widget = styled('div')(({ theme }) => ({
    padding: 16,
    borderRadius: 16,
    width: 300,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(18, 18, 26)' : 'rgba(10, 1, 23,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 100,
    height: 100,
    objectFit: 'cover',
    overflow: 'hidden',
    flexShrink: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '200%',
    },
});

const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

export default function MusicPlayerSlider() {
    const theme = useTheme();
    const duration = 200; // seconds
    const [position, setPosition] = React.useState(32);
    const [paused, setPaused] = React.useState(false);
    function formatDuration(value: number) {
        const minute = Math.floor(value / 60);
        const secondLeft = value - minute * 60;
        return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
    }
    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    const lightIconColor =
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
    return (
        <Box sx={{ overflow: 'hidden', display: 'flex', }}>
            <Widget>
                <Box sx={{ display: 'flex'}}>
                    <CoverImage>
                        <img
                            alt="can't win - Chilling Sunday"
                            src="http://c.files.bbci.co.uk/163D1/production/_103498019_gettyimages-475636556.jpg"
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Jun Pulse
                        </Typography>
                        <Typography noWrap>
                            <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                        </Typography>
                        <Typography noWrap letterSpacing={-0.25}>
                            Chilling Sunday &mdash; คนเก่าเขาทำไว้ดี
                        </Typography>
                    </Box>
                </Box>
                <ScrollBar duration={duration} position={position} theme={theme}
                           onChangeSetPosition={(_, value) => setPosition(value as number)} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mt: -2,
                    }}
                >
                    <TinyText>{formatDuration(position)}</TinyText>
                    <TinyText>-{formatDuration(duration - position)}</TinyText>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: -1,
                    }}
                >
                    <IconButton aria-label="previous song">
                        <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                    <IconButton
                        aria-label={paused ? 'play' : 'pause'}
                        onClick={() => setPaused(!paused)}
                    >
                        {paused ? (
                            <PlayArrowRounded
                                sx={{ fontSize: '3rem' }}
                                htmlColor={mainIconColor}
                            />
                        ) : (
                            <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
                        )}
                    </IconButton>
                    <IconButton aria-label="next song">
                        <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
                    </IconButton>
                </Box>
                <Stack spacing={2} direction="row" sx={{ mb: 1, px: 1 }} alignItems="center">
                    <VolumeDownRounded htmlColor={lightIconColor} />
                    <Slider
                        aria-label="Volume"
                        defaultValue={30}
                        sx={{
                            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                            '& .MuiSlider-track': {
                                border: 'none',
                            },
                            '& .MuiSlider-thumb': {
                                width: 24,
                                height: 24,
                                backgroundColor: '#fff',
                                '&:before': {
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                                },
                                '&:hover, &.Mui-focusVisible, &.Mui-active': {
                                    boxShadow: 'none',
                                },
                            },
                        }}
                    />
                    <VolumeUpRounded htmlColor={lightIconColor} />
                </Stack>
            </Widget>
        </Box>
    );
}