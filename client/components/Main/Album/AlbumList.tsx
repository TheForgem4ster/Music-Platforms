import React, {useEffect, useState} from "react";
import {genres} from "../../../assets/constants";
import {Box, Grid} from "@mui/material";
import AlbumCard from "./AlbumCard";
import {IAlbum} from "../../../types/album";
import CardMusicPlayer from "./CardMusicPlayer";

interface AlbumListProps {
    albums: IAlbum[],
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <div>
           <h1 style={{alignItems: 'center'}}>Album</h1>

            <Grid container >
                <>{domLoaded && (<>
                    {albums.map(album =>
                            <CardMusicPlayer key={album._id}
                                               album={album}/>

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