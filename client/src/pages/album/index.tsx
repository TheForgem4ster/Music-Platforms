import MainLayouts from "layouts/MainLayouts"
import React, {useEffect, useState} from "react"
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import {useTypedSelector} from "hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {NextThunkDispatch, wrapper} from "store";
import router from "next/router";
import AlbumList from "components/Main/Album/AlbumList";
import {fetchAlbum, searchAlbums} from "store/action-creators/album";
import MusicPlayerSlider from "components/Main/Album/CardMusicPlayer";
import SearchString from "../../../components/SearchString";
import {genres} from "../../../assets/constants";

const Album = () => {
    const {albums, error} = useTypedSelector(state => state.album);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState(null);

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        // setTimer(
        //     setTimeout(async () => {
        //         await dispatch(await searchAlbums(e.target.value));
        //     }, 500)
        // )

    }

    if (error) {
        return (
            <MainLayouts>
                {error}
            </MainLayouts>
        )
    }
    return (

        <MainLayouts title={"list album - music platform"}>
            <Grid container justifyContent='space-between'>
                <h1 style={{color: "white"}}>List Album</h1>
            </Grid>

            <Grid style={{display: 'flex'}}>
                <SearchString heightBar={60} widthBar={800} spacingNumber={2} placeholder={"Search albums..."} />
                <div style={{marginLeft: "auto"}}>
                    <select
                        onChange={() => {
                        }}
                        value={""}
                        className={""}
                    >
                        {genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                    </select>
                </div>
            </Grid>


            <AlbumList albums={albums} />

        </MainLayouts>

    )
}
export default Album

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbum());
});