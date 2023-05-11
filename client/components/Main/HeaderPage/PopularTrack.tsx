import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import {IAlbum} from "../../../types/album";
import {ITrack} from "../../../types/track";
import TrackList from "../ListTrack/TrackList";
import Track from "@/pages/tracks";
import {Button, Card, TextField} from "@mui/material";
import {useRouter} from "next/router";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import CardMusicPlayer from "../Album/CardMusicPlayer";
// const data = [
//     {
//         picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
//         audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
//         artist: 'Illya',
//         name: 'track',
//         title: 'music',
//     },
//     {
//         picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
//         audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
//         artist: 'Illya',
//         name: 'track',
//         title: 'music',
//     },
//     {
//         picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
//         audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
//         artist: 'Illya',
//         name: 'track',
//         title: 'music',
//     },
//     {
//         picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
//         audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
//         artist: 'Illya',
//         name: 'track',
//         title: 'music',
//     },
//     {
//         picture: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/picture/29584f98-6de9-4898-87bf-ba7607f2fad7.jpg',
//         audio: 'https://musicplatform.s3.eu-central-1.amazonaws.com/media/audio/734b6498-b7ad-4a80-8ba8-594731d4424a.mp3',
//         artist: 'Illya',
//         name: 'track',
//         title: 'music',
//     },
// ];

const PopularTrack = () => {
    const router = useRouter();
    const {tracks, error} = useTypedSelector(state => state.track);
    const {albums, errorAlbum} = useTypedSelector(state => state.album);

    return (
        <Grid container>
            {/*<CardMusicPlayer album={albums}/>*/}
            <TrackList tracks={tracks}/>

        </Grid>
    );
}

export default PopularTrack;
// interface MediaProps {
//     loading?: boolean;
// }
//
// function PopularTrack(props: MediaProps) {
//     const { loading = false } = props;
//
//     return (
//         <Grid container wrap="nowrap">
//             {(loading ? Array.from(new Array(5)) : data).map((item, index) => (
//                 <Box key={index} sx={{ width: 200, marginRight: 4, my: 5 }}>
//                     {item ? (
//                         <img
//                             style={{ width: 200, height: 118 }}
//                             alt={item.title}
//                             src={item.picture}
//                         />
//                     ) : (
//                         <Skeleton variant="rectangular" width={200} height={118} />
//                     )}
//                     {item ? (
//                         <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
//                             <Typography gutterBottom variant="body2">
//                                 {item.artist}
//                             </Typography>
//                             <Typography display="block" variant="caption" color="text.secondary">
//                                 {item.name}
//                             </Typography>
//                             <IconButton aria-label="play/pause" >
//                                 <PlayArrowIcon sx={{ height: 38, width: 38, }} />
//                             </IconButton>
//                         </Box>
//                     ) : (
//                         <Box sx={{ pt: 0.5 }}>
//                             <Skeleton />
//                             <Skeleton width="60%" />
//                         </Box>
//                     )}
//                 </Box>
//             ))}
//         </Grid>
//     );
// }
//
// export default function HitTrack() {
//     return (
//         <Box sx={{ overflow: 'hidden' }}>
//             <PopularTrack />
//             <PopularTrack loading/>
//         </Box>
//     );
// }
