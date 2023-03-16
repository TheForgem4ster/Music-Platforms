import React from "react"
import {IAlbum} from "../../../types/album";
// import {useDispatch} from "redux-react";

interface AlbumCard{
    tracksId: string[],
}

const AlbumCard : React.FC<AlbumCard> = ({tracksId}) => {
    return (
        <div>
            Album Card
        </div>
    )
}

export default AlbumCard;