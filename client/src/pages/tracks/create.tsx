import { Button } from "@mui/material";
import StepWrapper from "components/StepWrapper";
import MainLayouts from "layouts/MainLayouts";
import React, { useState } from "react";

const Create = () =>{

    const [activeStep, setActiveStep] = useState(0);
    const next = () => {
        setActiveStep(prev => prev + 1);
    }

    const back =()=> {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayouts>
            <StepWrapper activeStep={activeStep}>
                <h1>Download Track</h1>
                <Button onClick={back}>Back</Button>
                <Button onClick={next}>Next</Button>
            </StepWrapper>
        </MainLayouts>
    )
}

export default Create;