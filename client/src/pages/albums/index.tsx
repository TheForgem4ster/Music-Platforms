import { genres } from "assets/constants";
import MainLayouts from "layouts/MainLayouts"
import React, { useState } from "react"
import AlbumCard from "../../../components/Main/Album/AlbumCard";
import { IAlbum } from "../../../types/album";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { NextThunkDispatch, wrapper } from "store";
import router from "next/router";
import AlbumList from "components/Main/Album/AlbumList";
import { fetchAlbum } from "store/action-creators/album";

const Album = () => {
    const { albums, error } = useTypedSelector(state => state.album);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [query, setQuery] = useState<string>('');
    const [timer, setTimer] = useState(null);



    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if (timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )

    }

    if (error) {
        return (
            <MainLayouts>
                {error}
            </MainLayouts>
        )
    }
    return (
        <MainLayouts title={"list albums - music platform"}>
            <Grid>
                <Card>
                    <Box>
                        <Grid container justifyContent='space-between'>
                            <h1 style={{ color: "black" }}>List Album</h1>
                            <Button onClick={() => router.push('/album/create')}>Download</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <AlbumList albums={albums} />
                </Card>
            </Grid>
        </MainLayouts>
    )
}
export default Album

export const getServerSideProps = wrapper.getServerSideProps( 
    (store) => async ({req}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbum());
});