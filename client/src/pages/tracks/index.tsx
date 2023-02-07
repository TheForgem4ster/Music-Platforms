import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card/Card";
import Grid from "@mui/material/Grid/Grid";
import MainLayouts from "layouts/MainLayouts";
import React from "react";

const Track = () => {
    return ( 
        <MainLayouts>
            <Grid container justifyContent="center">
                <Card style={{width: 900}}>
                    <Grid container justifyContent="space-between">
                        <h1>List Track</h1>
                        <Button>Dounload</Button>
                    </Grid>
                </Card>
            </Grid>
        </MainLayouts>
    );
}

export default Track;