import StepWrapper from "components/StepWrapper";
import MainLayouts from "layouts/MainLayouts";
import React from "react";

const Create = () =>{
    return (
        <MainLayouts>
            <StepWrapper activeStep={1}>
                <h1>Download Track</h1>
            </StepWrapper>
        </MainLayouts>
    )
}

export default Create;