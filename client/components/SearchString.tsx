import React, {useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {fetchTracks, searchTracks} from "../store/action-creators/track";
import {useTypedSelector} from "../hooks/useTypedSelector";
import MainLayouts from "../layouts/MainLayouts";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../store";
import {fetchAlbum, getSpecificAlbum, searchAlbums} from "../store/action-creators/album";
import TrackList from "./Main/ListTrack/TrackList";
import {useFetcher} from "hooks/useFetcher";
import {useCallback} from "react";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    flexGrow: 1,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1.9),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme, widthCursor}) => ({
    color: 'inherit',

    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: widthCursor,
        },

    },
}));

interface SearchStringProps {
    widthBar: string;
    placeholder: string;
    widthCursor: string;
    flag: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

const SearchString: React.FC<SearchStringProps> = ({widthBar, placeholder,widthCursor,
                                                       flag,value,onChange, onClick}) => {

    const [regimeСhange, setRegimeChange] = useState(true);
    const [changeFlag, setchangeFlag] = useState(true);
    useEffect(() => {
        setRegimeChange(flag)
        if(!onChange){
            setchangeFlag(false);
        }
    }, [])
    const [query, setQuery] = useState<string>('');
    const {tracks, error} = useTypedSelector(state => state.track);
    const {albums, errorAlbum} = useTypedSelector(state => state.album);
    const [timer, setTimer] = useState(null);
    const [timerAlbum, setTimerAlbum] = useState(null);
    const dispatch = useDispatch() as NextThunkDispatch;

    useFetcher(fetchAlbum);

    const searchTrack = async (e: React.ChangeEvent<HTMLInputElement>) => {

        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )
    }

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timerAlbum) {
            clearTimeout(timerAlbum)
        }
        setTimerAlbum(
            setTimeout(async () => {
                // let authorId =  albums.map((album, index) => {
                //     // console.log(album.tracks);
                //     // aId = album.tracks
                //     // console.log("1");
                //     console.log(album);
                //     // console.log(albums[index].tracks);
                //     if(albums[index] === album._id) {
                //         // aId = albums[index].track;
                //         console.log("2");
                //         // console.log(album.tracks[index]);
                //     }
                // });
                await dispatch(await searchAlbums(e.target.value, '', ''));

            }, 500)
        )
    }

    if (error || errorAlbum) {
        return (
            <MainLayouts>
                {error}
            </MainLayouts>
        )
    }

    return (
        <div style={{width: widthBar}}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon/>
                </SearchIconWrapper>
                <StyledInputBase
                    onChange={regimeСhange ? search : changeFlag ? onChange : searchTrack}
                    // onChange={onChange}
                    widthCursor={widthCursor}
                    placeholder={placeholder}
                    inputProps={{'aria-label': 'search'}}
                />
            </Search>
        </div>
    )
}

export default SearchString;