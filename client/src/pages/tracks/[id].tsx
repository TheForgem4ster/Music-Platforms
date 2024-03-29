import { Button, Grid, TextField, Paper, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { useInput } from "hooks/useInput";
import MainLayouts from "layouts/MainLayouts";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ITrack } from "types/track";

const TrackPage = ({serverTrack}) => {

    const [track, setTrack] = useState<ITrack>(serverTrack)

    const router = useRouter();
    const username = useInput('')
    const text = useInput('')
    
    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]});
            username.reset();
            text.reset();
        } catch (e) {
            console.log(e)
        }
    }
    const imageUrl = track.picture;
    const defaultImageUrl = 'https://marketplace.canva.com/EAE25MFy9wQ/1/0/1600w/canva-music-logo-design-S0x32skUQb4.jpg';
    return (
        <MainLayouts
            title={"Music Playground - " + track.name + " - " + track.artist}
                        keywords={'Music, artists, ' + track.name + ", " + track.artist}>
            <Button variant={"outlined"}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}>
                In List
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img alt="Track image"
                     src={imageUrl}
                     onError={(e) => {
                         e.target.src = defaultImageUrl;
                     }}
                     width={200} height={200} style={{borderRadius: 50}}/>
                <div style={{marginLeft: 30}}>
                    <h1>Name track - {track.name}</h1>
                    <h1>Executor - {track.artist}</h1>
                    <h1>Listening - {track.listens}</h1>
                </div>
            </Grid>
            <h2 style={{textAlign: "center"}}>Words on the track</h2>
            <Paper
                elevation={3}
                style={{ padding: 20, marginTop: 20, borderRadius: 10, background: "#0E2333" }}
            >
                <Typography variant="body2">
                   Text: <em>{track.text}</em>
                </Typography>
            </Paper>

            <h2>Comments</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Your name" fullWidth {...username} />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="A comment"
                        {...text}
                        fullWidth
                        multiline
                        rows={4}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button onClick={addComment}>Send</Button>
                </Grid>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <Paper
                        elevation={3}
                        style={{ padding: 15, marginTop: 20, borderRadius: 10 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item >
                                <Avatar src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" />
                            </Grid>
                            <Grid item >
                                <Typography variant="body1">Author - <i>{comment.username}</i></Typography>
                                <Typography variant="body2">
                                    Comment:  {comment.text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </div>
        </MainLayouts>
    );
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}