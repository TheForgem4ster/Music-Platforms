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
import {deleteAlbum,addLike,  fetchAlbum} from "../../../store/action-creators/album";
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
    index: number;
}

const CardMusicPlayer: React.FC<AlbumItemProps> = ({album, index}) => {
    const router = useRouter()
    // const {likeCount} = useTypedSelector(state => state.album)
    const url = process.env.API_URL;
    const [like, setLike] = React.useState(album.likeCount);
    const dispatch = useDispatch() as NextThunkDispatch;

    const onDeleteAlbum = async () => {
        await await dispatch(deleteAlbum(album._id));
        await dispatch(fetchAlbum());
    }

    const countLike = async () => {
        setLike(++album.likeCount);
        await addLike(album._id)
        
    };

    const PressHandle = () => {
        dispatch(fetchTracksByAlbum(album._id));
        router.push('/album/' + album._id)
    }
    const imageUrl = url + album.picture;
    const defaultImageUrl = 'data:image/jpeg;base64,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';

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
                                <LikeIcon onClick={countLike}/>
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

