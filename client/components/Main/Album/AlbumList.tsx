import React, {useEffect, useState} from "react";
import {genres} from "../../../assets/constants";
import {Box, Grid} from "@mui/material";
import AlbumCard from "./AlbumCard";
import {IAlbum} from "../../../types/album";
import MusicPlayerSlider from "./CardMusicPlayer";

interface AlbumListProps {
    albums: IAlbum[],
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

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
            <Grid container direction="row">

                    <>{domLoaded && (<>
                            {albums.map(album =>
                                <MusicPlayerSlider/>

                                // <AlbumCard
                                //     key={album._id}
                                //     tracksId={album}
                                // />
                            )}
                        </>)}</>
              
            </Grid>
        </div>
    )
}

export default AlbumList;