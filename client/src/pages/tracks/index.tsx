import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, TextField } from "@mui/material";
import TrackList from "components/Main/ListTrack/TrackList";
import MainLayouts from "layouts/MainLayouts";
import { useRouter } from "next/router";
import { NextThunkDispatch, wrapper } from "store";
import { fetchTracks, searchTracks } from "store/action-creators/track";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useDispatch } from "react-redux";


const Track = () => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const {tracks, error} = useTypedSelector(state => state.track)
    const [timer, setTimer] = useState(null);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
      }, []);


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
                {error}
            </MainLayouts>
        )
    }

    return ( 
       <>{domLoaded && (
        <MainLayouts title={"list track - music platform"}>
        <Grid justifyContent='center' minWidth="100%" display="flex" >
            <Card style={{width: 900}}>
                <Box p={3}>
                    <Grid container justifyContent='space-between'>
                        <h1 style={{color: "black"}}>List Track</h1>
                        <Button onClick={()=> router.push('/tracks/create')}>Download</Button>
                    </Grid>
                </Box>
                <TextField 
                    fullWidth
                    value={query}
                    onChange={search}
                />

                <TrackList tracks={tracks}/>
            </Card>
        </Grid>
    </MainLayouts>
       )
       }</>
       
    );
}

export default Track;

export const getServerSideProps = wrapper.getServerSideProps( 
    (store) => async ({req}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks());
});