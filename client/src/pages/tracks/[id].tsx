import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useInput } from "hooks/useInput";
import MainLayouts from "layouts/MainLayouts";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { title } from "process";
import React, { useState } from "react";
import { ITrack } from "types/track";

const TrackPage = ({serverTrack}) => {

    const [track, setTrack] = useState<ITrack>(serverTrack)
    // const track: ITrack =  {_id: '1', name: "Track 1", artist: "Executor 1", text: "text 1", listens: 15, audio: "https://localhost:5000/audio/", picture: "https://localhost:5000/picture/", comments: []}
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
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayouts   
            title={"Музыкальная площадка - " + track.name + " - " + track.artist}
                        keywords={'Музыка, артисты, ' + track.name + ", " + track.artist}>
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
                    {...username}
                />
                <TextField
                    label="Комментарий"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Отправить</Button>
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

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}