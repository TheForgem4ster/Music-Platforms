import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Widget = styled('div')(({ theme }) => ({
    margin: 15,
    padding: 16,
    borderRadius: 16,
    width: 200,
    maxWidth: '100%',
    position: 'relative',
    zIndex: 1,
    backgroundColor:
        theme.palette.mode === 'dark' ? 'rgb(18, 18, 26)' : 'rgba(10, 1, 23,0.4)',
    backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
    width: 170,
    height: 170,
    objectFit: 'cover',
    overflow: 'hidden',
    margin: "0 auto",
    flexShrink: 0,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '200%',
    },
});

export default function MusicPlayerSlider() {

    return (
        <Box sx={{ overflow: 'hidden', display: 'flex'}}>
            <Widget>
                <Box>
                    <CoverImage >
                        <img style={{alignItems: "center"}}
                            alt="can't win - Chilling Sunday"
                            src="http://c.files.bbci.co.uk/163D1/production/_103498019_gettyimages-475636556.jpg"
                        />
                    </CoverImage>
                    <Box sx={{ ml: 1.5, minWidth: 0 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500} noWrap>
                            Jun Pulse
                        </Typography>
                        <Typography noWrap>
                            <b>คนเก่าเขาทำไว้ดี (Can&apos;t win)</b>
                        </Typography>
                    </Box>
                </Box>

            </Widget>
        </Box>
    );
}