import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {IAlbum} from "../../../types/album";
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import {IconButton} from "@mui/material";
import {Delete, Pause, PlayArrow, VolumeUp} from '@mui/icons-material';
import {useRouter} from "next/router";
import {useDispatch} from 'react-redux';
import {NextThunkDispatch} from "../../../store";
import {deleteAlbum, addRemoveLike,  fetchAlbum} from "../../../store/action-creators/album";
import { fetchTracksByAlbum } from 'store/action-creators/track';
import { useFetcher } from 'hooks/useFetcher';
;

const Widget = styled('div')(({theme}) => ({
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
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgb(40, 40, 48)' : 'rgba(20, 11, 33, 0.6)',
        cursor: 'pointer',
    },
}));

const CoverImage = styled('div')({
    width: 170,
    height: 150,
    objectFit: 'cover',
    overflow: 'hidden',
    margin: "0 auto",
    flexShrink: 0,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.08)',
    '& > img': {
        width: '100%',
        height: '100%',
    },
});

interface AlbumItemProps {
    album: IAlbum;
}

const CardMusicPlayer: React.FC<AlbumItemProps> = ({album}) => {
    const router = useRouter()
    // const {likeCount} = useTypedSelector(state => state.album)
    const url = process.env.API_URL;
    const dispatch = useDispatch() as NextThunkDispatch;

    const [like, setLike] = React.useState(album.likeCount);
    const [liked, setLiked] = React.useState(false);
    const [flag, setFlag] = React.useState(1);

    React.useEffect(() => {
        const likeStatus = localStorage.getItem(album._id);
        if (likeStatus) {
            setLiked(likeStatus === "true");
        }
    }, []);

    React.useEffect(() => {
        localStorage.setItem(album._id, liked.toString());

    }, [liked]);

    const onDeleteAlbum = async () => {
        await dispatch(await deleteAlbum(album._id));
        await dispatch(fetchAlbum());
    }


    const countLike = async () => {
        debugger;
        if (!liked) {
            setFlag(1);
            setLike((prevLike) => prevLike + 1);

            await addRemoveLike(album._id, 1);
        } else {

            setFlag(0);
            setLike((prevLike) => prevLike - 1);

            await addRemoveLike(album._id, 0);
        }
        setLiked((prevLiked) => !prevLiked);
    };

    const PressHandle = () => {
        dispatch(fetchTracksByAlbum(album._id));
        router.push('/album/' + album._id)
    }
    const imageUrl = url + album.picture;
    const defaultImageUrl = 'https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000';

    return (
        <Box sx={{overflow: 'hidden', display: 'flex'}}>
            <Widget onClick={() => PressHandle()}>

                <Box>
                    <CoverImage>
                        <img style={{alignItems: "center"}}
                             alt="Image album's cover"
                             src={imageUrl}
                             onError={(e) => {
                                 e.target.src = defaultImageUrl;
                             }}

                            //  src={url + album.picture}
                        />
                    </CoverImage>
                    <Box sx={{
                        ml: 1.5,
                        minWidth: 0,
                        marginLeft: "auto",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <div style={{alignItems: "center", textAlign: "center"}}>
                            <Typography variant="caption" color="text.secondary" fontWeight={500} noWrap fontSize={20}>
                                {album.name}
                            </Typography>
                        </div>

                        <div style={{display: "flex",}}>

                            <Typography noWrap style={{margin: "10px 0px"}}>
                                <div style={{marginLeft: 10}}>{like}</div>

                            </Typography>
                            <IconButton onClick={e => e.stopPropagation()}>
                                <LikeIcon onClick={countLike} sx={{ color: liked ? 'blue' : 'white' }}/>
                            </IconButton>

                            <IconButton style={{marginLeft: "auto"}} onClick={e => e.stopPropagation()}>
                                <Delete onClick={onDeleteAlbum}/>
                            </IconButton>
                        </div>
                    </Box>
                </Box>
            </Widget>
        </Box>
    );
}

export default CardMusicPlayer

