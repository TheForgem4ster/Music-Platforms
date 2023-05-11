import MainLayouts from "layouts/MainLayouts"
import React, {useEffect, useState} from "react"
import {Grid, TextField} from "@mui/material";
import {useTypedSelector} from "hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "store";
import AlbumList from "components/Main/Album/AlbumList";
import {fetchAlbum, searchAlbums} from "store/action-creators/album";
import SearchString from "../../../components/SearchString";
import {genres} from "../../../assets/constants";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Album = () => {
    const {albums, errorAlbum} = useTypedSelector(state => state.album);
    // const dispatch = useDispatch() as NextThunkDispatch;
    // const [query, setQuery] = useState<string>('');
    // const [timer, setTimer] = useState(null);
    const [domLoaded, setDomLoaded] = useState(false);


    useEffect(() => {
        setDomLoaded(true);
    }, []);


    if (errorAlbum) {
        return (
            <MainLayouts>
                {errorAlbum}
            </MainLayouts>
        )
    }

    const [Genres, setGenres] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setGenres(event.target.value);
    };

    return (
        <>{domLoaded && (
        <MainLayouts title={"list album - music platform"}>
            <Grid container justifyContent='space-between'>
                <h1 style={{color: "white"}}>List Album</h1>
            </Grid>

            <Grid style={{display: 'flex'}}>
                <div style={{ flexGrow: 1}}>
                    <SearchString
                        value={true}
                        placeholder={"Search albums..."}
                        widthCursor={'45em'}
                        id={albums._id}
                    />
                </div>

                <FormControl sx={{ minWidth: 170 }} size="small" style={{marginLeft: "auto"}}>
                    <InputLabel id="demo-select-small">Genres</InputLabel>
                    <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value={Genres}
                        label="Genres"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {genres.map(genre =>  <MenuItem key={genre.value} value={genre.value}>{genre.title}</MenuItem>)}
                    </Select>
                </FormControl>

            </Grid>
            <AlbumList albums={albums} />
        </MainLayouts>
        )}</>
    )
}
export default Album;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchAlbum());
// });