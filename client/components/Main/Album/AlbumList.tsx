import React from "react";
import {genres} from "../../../assets/constants";
import {Box, Grid} from "@mui/material";
import AlbumCard from "./AlbumCard";
import {IAlbum} from "../../../types/album";

interface AlbumListProps {
    albums: IAlbum[],
    trackId: string[],

}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {

    const genreTitle = 'Pop';
    return (
        <div>
            Album
            <div>
                <select
                    onChange={() => {
                    }}
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
        </div>
    )
}

export default AlbumList;