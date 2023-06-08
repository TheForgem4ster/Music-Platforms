import React, {useEffect, useState} from "react";
import {Box, Button, Card, Grid, TextField} from "@mui/material";
import TrackList from "components/Main/ListTrack/TrackList";
import MainLayouts from "layouts/MainLayouts";
import {useRouter} from "next/router";
import {NextThunkDispatch, wrapper} from "store";
import {fetchTracks, searchTracks} from "store/action-creators/track";
import {useTypedSelector} from "hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import { useFetcher } from "hooks/useFetcher";
import {genres} from "../../../assets/constants";
import SearchString from "../../../components/SearchString";
import { GetServerSideProps } from "next";


const Track = ({initialTracks}) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');
    const {tracks, error} = useTypedSelector(state => state.track)
    const [searchedTracks, setSearchedTracks] = useState(initialTracks);
    const [timer, setTimer] = useState(null);
    const dispatch = useDispatch() as NextThunkDispatch;
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    useEffect(() => {
        setSearchedTracks(tracks);
      }, [tracks]);

    
    return (
        // <>{domLoaded && (
            <MainLayouts title={"list track - music platform"}>
                <Grid justifyContent='center' minWidth="100%" display="flex">
                    <Card style={{width: "90%"}}>
                        <Box p={3}>
                            <Grid container justifyContent='space-between'>
                                <h1 style={{color: "white"}}>List Track</h1>
                                <Button onClick={() => router.push('/tracks/create')}>Upload</Button>
                            </Grid>
                        </Box>
                        
                        <SearchString
                            flag={false}
                            placeholder={"Search albums..."}
                            widthCursor={'45em'}

                        />
                        <TrackList tracks={searchedTracks}/>
                    </Card>
                </Grid>
            </MainLayouts>
        //</>
    );
}

export default Track;


export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async () => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(fetchTracks());
      
      const { track } = store.getState();

      return {
        props: {
            initialTracks: track.tracks, 
        },
      };
    }
  );