import React from "react";
import { Card, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";

interface StepWrapperProps {
    activeStep: number;
    children?: React.ReactNode;
}
const steps = ['Track Information', 'Download the cover', 'Download the track itself']

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) =>
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0 ', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                </Card>
            </Grid>
        </Container>
    );
};

export default StepWrapper;