import { genres } from "assets/constants";
import MainLayouts from "layouts/MainLayouts"
import React from "react"
import AlbumCard from "../../../components/Main/Album/AlbumCard";
import {IAlbum} from "../../../types/album";
import {Box, Grid} from "@mui/material";

interface AlbumListProps {
    albums: IAlbum[],
    trackId: string[],

}

const AlbumPage : React.FC<AlbumListProps> = ({albums}) => {

    const genreTitle = 'Pop';

    return (
        <MainLayouts>
            Album
            <div>
                <select
                    onChange={()=>{}}
                    value={""}
                    className={""}
                >
                    {genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>
            <Grid container direction="column">
                <Box p={2}>
                {albums.map(album => {
                    <AlbumCard
                        key={album._id}
                        tracksId={album.track}
                    />
                })}
                </Box>
            </Grid>
        </MainLayouts>
    )
}

export default AlbumPage;