import React, { useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import TrackList from "components/TrackList";
import MainLayouts from "layouts/MainLayouts";
import { useRouter } from "next/router";
import { NextThunkDispatch, wrapper } from "store";
import { fetchTracks, searchTracks } from "store/action-creators/track";
import { useTypedSelector } from "hooks/useTypedSelector";
import { ITrack } from "types/track";
import { useDispatch } from "react-redux";


const Track = () => {
    const router = useRouter();
    const [query, seacrh] = useState<string>('');
    const {tracks, error} = useTypedSelector(state => state.track)
    const [timer, setTimer] = useState(null);
    const dispatch = useDispatch() as NextThunkDispatch;


    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if(timer){
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async ()=>{
                await dispatch(await searchTracks(e.target.value));
            }, 500)
        )
       
    }

    if(error) {
        return (
            <MainLayouts>
                <h1>{error}</h1>
            </MainLayouts>
        )
    }
    // const tracks : ITrack[] = [
    //     {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "http://localhost:5000/audio/2923b657-85bf-4107-bf93-3ca40d28f56e.mp3", picture: "http://localhost:5000/image/2e1b0f2d-74ac-45ba-ace7-82fa3147dd2b.jpg", comments: []},
    //     {_id: '2', name: "Track 2", artist: "Executor 2", text: "text 2", listens: 25, audio: "http://localhost:5000/audio/", picture: "http://localhost:5000/image/", comments: []},
    //     {_id: '3', name: "Track 3", artist: "Executor 3", text: "text 3", listens: 35, audio: "http://localhost:5000/audio/", picture: "http://localhost:5000/image/", comments: []},
    // ];

    return ( 
       
        <MainLayouts title={"list track - music platform"}>
            <Grid justifyContent='center' minWidth="100%" display="flex" >
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>List Track</h1>
                            <Button onClick={()=> router.push('/tracks/create')}>Download</Button>
                        </Grid>
                    </Box>
                    <TextField 
                        fullWidth
                        value={query}
                        onChange={seacrh}
                    />
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayouts>
    );
}

export default Track;

// export const getServerSideProps = wrapper.getServerSideProps(
//     {param}) => {
//         console.log(param);
//         return {
            
//         }
//     }
    // async ({store}) => {
    //     const dispatch = store.dispatch as NextThunkDispatch
    //     await dispatch(await fetchTracks())
    // }


export const getServerSideProps = wrapper.getServerSideProps( 
    (store) => async ({req}) => {
    // console.log("1111" + store);
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks());
    // console.log("222" + store);
});
    