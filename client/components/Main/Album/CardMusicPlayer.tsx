import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {IAlbum} from "../../../types/album";
import LikeIcon from '@mui/icons-material/ThumbUpAlt';
import {IconButton} from "@mui/material";
import {useEffect} from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useRouter} from "next/router";

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


    const countLike = () => {
        setLike(++album.likeCount);

        console.log(album.likeCount);
    };
    return (
        <Box sx={{overflow: 'hidden', display: 'flex'}}>
            <Widget onClick={() => router.push('/album/' + album._id)}>  {/*onClick={() => router.push('/tracks/' )}*/}

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
                        display: "flex",
                        marginLeft: "auto",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500} noWrap>
                            {album.name}
                        </Typography>
                        <div style={{display: "flex"}}>
                            <Typography noWrap style={{margin: "10px 0px"}}>
                                {like}
                            </Typography>
                            <IconButton onClick={countLike}>
                                <LikeIcon/>
                            </IconButton>
                        </div>
                    </Box>
                </Box>
            </Widget>
        </Box>
    );
}

export default CardMusicPlayer
