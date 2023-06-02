import React, {useEffect} from "react";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import {styled} from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import CircularProgress from '@mui/material/CircularProgress';


const CustomTextField = styled(TextField)(({theme}) => ({
    '& .MuiAutocomplete-inputRoot': {
        height: '43px', // Измените высоту по вашему желанию
    },
    '& .MuiAutocomplete-input': {
        cursor: 'pointer',
        height: '8px',
        marginLeft: 27,
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 0, 2.5,1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const AutoCompleteSearch = () => {
    const {tracks, error} = useTypedSelector(state => state.track);
    const {albums, errorAlbum} = useTypedSelector(state => state.album);

    const router = useRouter();


    const handleTrackSelect = (event: React.ChangeEvent<{}>, value: string | null) => {

        if (value) {
            console.log("123")
            const selectedTrack = tracks.find((track) => track.name === value);
            if (selectedTrack) {
                router.push(`/tracks/${selectedTrack._id}`);
            } else {
                const selectedAlbum = albums.find((album) => album.name === value);
                if (selectedAlbum) {
                    router.push(`/album/${selectedAlbum._id}`);
                }
            }
        }
    };

    const arrayTrack = tracks.map((t) => {
        return t.name;
    })

    const arrayAlbum = albums.map((a) => {
        return a.name;
    })

    return (
        <div>
            <Stack spacing={2} sx={{width: 300}}>
                <div>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>

                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={[...arrayTrack, ...arrayAlbum]}
                        renderInput={(params) => (
                            <CustomTextField
                                {...params}
                            />
                        )}
                        onChange={handleTrackSelect}
                    />
                </div>
            </Stack>
        </div>
    )
}

export default AutoCompleteSearch;