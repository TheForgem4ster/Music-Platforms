import MainLayouts from "layouts/MainLayouts";
import React, {useState} from "react";
import {width} from "@mui/system";
import SearchString from "../../../components/SearchString";
import {fetchAlbum, getSpecificAlbum, searchAlbums} from "../../../store/action-creators/album";
import { Card, IconButton } from "@mui/material";
import TrackList from "../../../components/Main/ListTrack/TrackList";
import {ITrack} from "../../../types/track";
import Track from "@/pages/tracks";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "../../../store";
import {fetchTracks} from "../../../store/action-creators/track";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {IAlbum} from "../../../types/album";
import { PlayArrow } from "@mui/icons-material";
import {GetServerSideProps} from "next";
import axios from "axios";

interface TrackItemProps {
    album: IAlbum;
}

const AlbumId: React.FC<TrackItemProps> = ({ album}) => {

    const {tracks, error} = useTypedSelector(state => state.track)
    // const originalDate = albums[1].dateCreate;
    const originalDate = "2023-03-16T14:54:49.000Z";
    const date = new Date(originalDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return (
        <MainLayouts title={"list album - music platform"}>
        <div style={{display: "flex"}}>
            <img src={"https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000"} style={{ width:220, height: 170, borderRadius: 20,}}/>
            <div style={{ justifyItems: "center", alignItems: "center",flex: 1}} >
                <h1 style={{ textAlign: "center"}}>Name album: </h1>
                {/*{albums[0].name}*/}
                <h4 style={{marginLeft: 30}}>Create by: </h4>
                {/*{formattedDate}*/}
                <h4 style={{marginLeft: 30}}>Like count: </h4>
                {/*{albums[0].likeCount}*/}
                <IconButton style={{height: 50, width: 150, borderRadius: 30, textAlign: "center", flex: 1 }}>
                    <PlayArrow style={{fontSize: 40, color: "#D6D8FF"}}/>
                </IconButton>

            </div>
        </div>
        <div style={{marginTop: 40}}>
            <SearchString
                value={true}
                placeholder={"Search albums..."}
                widthCursor={'45em'}
                />
            <TrackList tracks={tracks}/>
        </div>
        </MainLayouts>
    )
}
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/album/' + params.id);
    return {
        props: {
            serverTrack: response.data
        }
    }
}

// export const getServerSideProps = wrapper.getServerSideProps(
//     (store) => async ({req }) => {
//         const dispatch = store.dispatch as NextThunkDispatch;
//         await dispatch(await fetchAlbum())
//     });

export default AlbumId;