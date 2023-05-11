import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {IAlbum} from "../../../types/album";
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import {IconButton} from "@mui/material";
import {Delete, Pause, PlayArrow, VolumeUp} from '@mui/icons-material';
import {useRouter} from "next/router";
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import {useDispatch} from 'react-redux';
import {NextThunkDispatch} from "../../../store";
import {deleteAlbum} from "../../../store/action-creators/album";

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
}

const CardMusicPlayer: React.FC<AlbumItemProps> = ({album}) => {
    const router = useRouter()
    // const {likeCount} = useTypedSelector(state => state.album)
    const url = process.env.API_URL;
    const [like, setLike] = React.useState(album.likeCount);
    const dispatch = useDispatch() as NextThunkDispatch;

    const onDeleteAlbum = async () => {
        dispatch(deleteAlbum(album._id));
    }

    const countLike = () => {
        setLike(++album.likeCount);

        console.log(album.likeCount);
    };


    return (
        <Box sx={{overflow: 'hidden', display: 'flex'}}>
            {/*onClick={() => router.push('/album/' + album._id)}*/}
            <Widget >  {/*onClick={() => router.push('/tracks/' )}*/}

                <Box>
                    <CoverImage>
                        <img style={{alignItems: "center"}}
                             alt="images"
                            // src="http://c.files.bbci.co.uk/163D1/production/_103498019_gettyimages-475636556.jpg"
                             src={url + album.picture}
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

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <IconButton style={{ marginLeft: "auto" }}>
                                <PlaylistAddCheckIcon onClick={() => router.push('/album/' + album._id)} />
                            </IconButton>
                            <Typography noWrap style={{ margin: "10px 0px" }}>
                                {like}
                            </Typography>
                            <IconButton onClick={countLike}>
                                <LikeIcon />
                            </IconButton>
                            <IconButton style={{ marginRight: "auto" }}>
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
