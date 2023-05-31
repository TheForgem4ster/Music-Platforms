import MainLayouts from "layouts/MainLayouts"
import React, {useEffect, useState} from "react"
import {Grid, TextField} from "@mui/material";
import {useTypedSelector} from "hooks/useTypedSelector";
import AlbumList from "components/Main/Album/AlbumList";
import SearchString from "../../../components/SearchString";
import {genres} from "../../../assets/constants";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddAlbum from "../../../components/Main/Album/AddAlbum";

const Album = () => {
    const {albums, errorAlbum} = useTypedSelector(state => state.album);

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
                        flag={true}
                        placeholder={"Search albums..."}
                        widthCursor={'45em'}
                        genres={genres}
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
                        {genres.map(genre => <MenuItem key={genre.value} value={genre.value}>{genre.title}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>

            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
                <AddAlbum />
                <AlbumList albums={albums} />

            </div>

        </MainLayouts>
        )}</>
    )
}
export default Album;

// export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchAlbum());
// });