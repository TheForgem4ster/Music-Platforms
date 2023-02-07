import { Box, Button, Card, Grid } from "@mui/material";
import TrackList from "components/TrackList";
import MainLayouts from "layouts/MainLayouts";
import { useRouter } from "next/router";
import React from "react";
import { ITrack } from "types/track";

const Track = () => {
    const router = useRouter();
    const tracks : ITrack[] = [
        {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "http://localhost:5000/audio/", picture: "http://localhost:5000/image/", comments: []},
        {_id: '2', name: "Track 2", artist: "Executor 2", text: "text 2", listens: 25, audio: "http://localhost:5000/audio/", picture: "http://localhost:5000/image/", comments: []},
        {_id: '3', name: "Track 3", artist: "Executor 3", text: "text 3", listens: 35, audio: "http://localhost:5000/audio/", picture: "http://localhost:5000/image/", comments: []},
    ];

    return ( 
       
        <MainLayouts>
            <Grid justifyContent='center' minWidth="100%" display="flex" >
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>List Track</h1>
                            <Button onClick={()=> router.push('/tracks/create')}>Download</Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayouts>
    );
}

export default Track;