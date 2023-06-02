import {Button, Grid, TextField} from "@mui/material";
import axios from "axios";
import FileUpload from "components/Main/ListTrack/DownloadTrack/FileUpload";
import StepWrapper from "components/Main/ListTrack/DownloadTrack/StepWrapper";
import {useInput} from "hooks/useInput";
import MainLayouts from "layouts/MainLayouts";
import {useRouter} from "next/router";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const Create = () => {

    const [activeStep, setActiveStep] = useState(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const [imageSize, setImageSize] = useState({width: null, height: null});

    React.useEffect(() => {
        if (picture) {
            const img = new Image();
            img.src = URL.createObjectURL(picture);
            img.onload = () => {
                const {width, height} = img;
                const maxWidth = 450;
                const maxHeight = 300;
                let newWidth = width;
                let newHeight = height;

                if (width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (maxWidth / width) * height;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (maxHeight / height) * width;
                }

                setImageSize({width: newWidth, height: newHeight});
            };
        }
    }, [picture]);

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1);
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const handleFileUpload = (file) => {
        setPicture(file);
    };

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayouts>
            <StepWrapper activeStep={activeStep}>
                {
                    activeStep === 0 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                        <TextField
                            {...name}
                            style={{marginTop: 10}}
                            label={"Name of the track"}
                        />
                        <TextField
                            {...artist}
                            style={{marginTop: 10}}
                            label={"Artist name"}
                        />
                        <TextField
                            {...text}
                            style={{marginTop: 10}}
                            label={"Lyrics for the track"}
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {
                    activeStep === 1 &&
                    <Box sx={{alignItems: 'center', marginTop: 2}}>
                        <div style={{display: "flex"}}>
                            <FileUpload setFile={handleFileUpload} accept="image/*">
                                <Button style={{fontSize: 20}}>Upload an image</Button>
                            </FileUpload>
                            <div style={{textAlign: "center", fontStyle: "italic", fontSize: 20, marginLeft: "auto"}}>
                                <div style={{padding: "10px 20px"}}>
                                    {picture ? "File uploaded:\n" + picture.name : "File missing"}
                                </div>
                            </div>
                        </div>
                        <Box
                            sx={{
                                ml: 1.5,
                                minWidth: 0,
                                marginLeft: 'auto',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            {picture && (
                                <Box
                                    sx={{
                                        mt: 2,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(picture)}
                                        alt="Uploaded Image"
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "100%",
                                            width: imageSize.width,
                                            height: imageSize.height,
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                }
                {activeStep === 2 && (
                    <div>
                    <Box sx={{display: "flex", alignItems: "center", marginTop: 2 }}>
                        <FileUpload setFile={setAudio} accept="audio/*">
                            <Button>Upload the audio</Button>
                        </FileUpload>
                        <Box
                            sx={{
                                ml: 1.5,
                                minWidth: 0,
                                marginLeft: "auto",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    textAlign: "center",
                                    fontStyle: "italic",
                                    fontSize: 20,
                                }}
                            >
                                <div style={{padding: "10px 20px"}}>
                                    {audio ? "File uploaded: " + audio.name : "File missing"}
                                </div>

                            </Typography>
                        </Box>
                    </Box>
                        <div
                            style={{
                                margin: "80px auto",
                                width: 100,
                                height: 100,
                            }}
                        >
                            {audio && <MusicNoteIcon style={{ fontSize: 100 }} />}
                        </div>

                    </div>
                )}
                {/*{activeStep === 2 && (*/}
                {/*    <Box sx={{display: "flex", alignItems: "center", marginTop: 2}}>*/}
                {/*        <FileUpload setFile={setAudio} accept="audio/*">*/}
                {/*            <Button style={{fontSize: 20}}>Upload the audio</Button>*/}
                {/*        </FileUpload>*/}
                {/*        <Box*/}
                {/*            sx={{*/}
                {/*                ml: 1.5,*/}
                {/*                minWidth: 0,*/}
                {/*                marginLeft: "auto",*/}
                {/*                alignItems: "center",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Typography*/}
                {/*                variant="body2"*/}
                {/*                sx={{*/}
                {/*                    textAlign: "center",*/}
                {/*                    fontStyle: "italic",*/}
                {/*                    fontSize: 20,*/}
                {/*                }}*/}
                {/*            >*/}
                {/*                <div style={{padding: "10px 20px"}}>*/}
                {/*                    {audio ? "File uploaded:\n" + audio.name : "File missing"}*/}
                {/*                </div>*/}


                {/*            </Typography>*/}
                {/*        </Box>*/}
                {/*        {audio ?*/}
                {/*            <MusicNoteIcon sx={{ marginRight: 1, height: 50, weight: 20, }} /> :*/}
                {/*            "" }*/}
                {/*    </Box>*/}
                {/*)}*/}
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayouts>
    )
}

export default Create;