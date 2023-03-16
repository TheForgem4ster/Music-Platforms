import React from "react"
import {IAlbum} from "../../../types/album";
// import {useDispatch} from "redux-react";

interface AlbumCard{
    tracksId: IAlbum,
}

const AlbumCard : React.FC<AlbumCard> = ({tracksId}) => {
    return (
        <div>
            Album Card
            <img width={70} height={70} src={process.env.API_URL+tracksId.picture}/>
        </div>
    )
}

export default AlbumCard;