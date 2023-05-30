import React, {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {IAlbum} from "../../../types/album";
import CardMusicPlayer from "./CardMusicPlayer";

interface AlbumListProps {
    albums: IAlbum[],
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {

    const [count, setCount] = React.useState(0);

    const checkNumberAlbum = (index: number) => {
        setCount(index);
    }


    if (!Array.isArray(albums)) {
        return <div>Loading... ERROR</div>;
    }

    return (
        <div>
           {/*<h2 style={{alignItems: 'center', marginTop: 10}}>Genres:   </h2>*/}

            <Grid container >
                {/*<>{domLoaded && (<>*/}
                    {albums.map((album, index) =>
                            <CardMusicPlayer
                                key={album._id}
                                album={album}
                                index={index}
                            />
                    )}
                {/*</>)}</>*/}

            </Grid>
        </div>
    )
}

export default AlbumList;