import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
const data = [
    {
        picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
        audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
        artist: 'Illya',
        name: 'track',
        title: 'music',
    },
    {
        picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
        audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
        artist: 'Illya',
        name: 'track',
        title: 'music',
    },
    {
        picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
        audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
        artist: 'Illya',
        name: 'track',
        title: 'music',
    },
    {
        picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
        audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
        artist: 'Illya',
        name: 'track',
        title: 'music',
    },
    {
        picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
        audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
        artist: 'Illya',
        name: 'track',
        title: 'music',
    },
];

interface MediaProps {
    loading?: boolean;
}

function PopularTrack(props: MediaProps) {
    const { loading = false } = props;

    return (
        <Grid container wrap="nowrap">
            {(loading ? Array.from(new Array(5)) : data).map((item, index) => (
                <Box key={index} sx={{ width: 200, marginRight: 4, my: 5 }}>
                    {item ? (
                        <img
                            style={{ width: 200, height: 118 }}
                            alt={item.title}
                            src={item.picture}
                        />
                    ) : (
                        <Skeleton variant="rectangular" width={200} height={118} />
                    )}
                    {item ? (
                        <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                            <Typography gutterBottom variant="body2">
                                {item.artist}
                            </Typography>
                            <Typography display="block" variant="caption" color="text.secondary">
                                {item.name}
                            </Typography>
                            <IconButton aria-label="play/pause" >
                                <PlayArrowIcon sx={{ height: 38, width: 38, }} />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ pt: 0.5 }}>
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Box>
                    )}
                </Box>
            ))}
        </Grid>
    );
}

export default function YouTube() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <PopularTrack />
            <PopularTrack loading/>
        </Box>
    );
}
// import React from "react";
// import {Container} from "@mui/material";
// import PlayCircleIcon from '@mui/icons-material/PlayCircle';
//
// const PopularTrack = () => {
//
//     return <div>
//         Track
//         <Container>
//             <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Shopping_cart_of_Prisma_shop.JPG/640px-Shopping_cart_of_Prisma_shop.JPG"}/>
//             <PlayCircleIcon/>
//             <div>author</div>
//             <div>name audio</div>
//
//         </Container>
//     </div>
// }
//
// export default PopularTrack;