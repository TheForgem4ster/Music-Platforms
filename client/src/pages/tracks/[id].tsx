import { Button, Grid, TextField } from "@mui/material";
import MainLayouts from "layouts/MainLayouts";
import { useRouter } from "next/router";
import React from "react";
import { ITrack } from "types/track";

const TrackPage = () => {

    const track: ITrack =  {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "https://localhost:5000/audio/", picture: "https://localhost:5000/picture/", comments: []}
    const router = useRouter();

    return (
        <MainLayouts>
            <Button variant={"outlined"}
                    style={{fontSize: 32}}
                    onClick={() => router.push('/tracks')}>
                In List
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200}/>
                <div style={{marginLeft: 30}}>
                    <h1>Name track - {track.name}</h1>
                    <h1>Executor - {track.artist}</h1>
                    <h1>Listening - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова в треке</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
             <Grid container>

                <TextField
                    label="Ваше имя"
                    fullWidth
                    // {...username}
                />
                <TextField
                    label="Комментарий"
                    // {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button >Отправить</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayouts>
    );
}

export default TrackPage;