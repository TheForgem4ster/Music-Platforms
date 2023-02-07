import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "components/FileUpload";
import StepWrapper from "components/StepWrapper";
import MainLayouts from "layouts/MainLayouts";
import React, { useState } from "react";

const Create = () =>{

    const [activeStep, setActiveStep] = useState(0);
    const next = () => {
        
        if(activeStep !==  2){
            setActiveStep(prev => prev + 1);
        }
    }

    const back =()=> {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayouts>
            <StepWrapper activeStep={activeStep}>
                {
                    activeStep === 0 &&
                    <Grid container direction={"column"} style={{padding: 20}}>
                    <TextField
                        // {...name}
                        style={{marginTop: 10}}
                        label={"Название трека"}
                    />
                    <TextField
                        // {...artist}
                        style={{marginTop: 10}}
                        label={"Имя исполнителя"}
                    />
                    <TextField
                        // {...text}
                        style={{marginTop: 10}}
                        label={"Слова к треку"}
                        multiline
                        rows={3}
                    />
                </Grid>
                }
                {
                    activeStep === 1 &&
                    <FileUpload file={''} setFile={()=>({})} accept="image/*">
                        <Button>Загрузите изображение</Button>
                    </FileUpload>
                }
                {
                    activeStep === 2 &&
                    <h1>Step 3</h1>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </Grid>
        </MainLayouts>
    )
}

export default Create;