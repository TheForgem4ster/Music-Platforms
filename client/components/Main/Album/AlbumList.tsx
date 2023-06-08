import React, {useEffect, useState} from "react";
import {Box, Grid} from "@mui/material";
import {IAlbum} from "../../../types/album";
import CardMusicPlayer from "./CardMusicPlayer";

interface AlbumListProps {
    albums: IAlbum[],
}

const AlbumList: React.FC<AlbumListProps> = ({albums}) => {

    const [count, setCount] = React.useState(0);
  console.log(albums)
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
                {albums.map((album) =>
                            <CardMusicPlayer
                                key={album._id}
                                album={album}
                            />
                    )}
                {/*</>)}</>*/}

            </Grid>
        </div>
    )
}

export default AlbumList;