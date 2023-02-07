import { Box } from "@mui/material";
import Button from "@mui/material/Button/Button";
import Card from "@mui/material/Card/Card";
import Grid from "@mui/material/Grid/Grid";
import MainLayouts from "layouts/MainLayouts";
import React from "react";

const Track = () => {
    return ( 
        <MainLayouts>
            <Grid justifyContent='center' container >
                <Card style={{width: 900}}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>List Track</h1>
                            <Button>Dounload</Button>
                        </Grid>
                    </Box>
                    
                </Card>
            </Grid>
        </MainLayouts>
    );
}

export default Track;