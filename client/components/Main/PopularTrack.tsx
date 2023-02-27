import React from "react";
import {Container} from "@mui/material";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const PopularTrack = () => {

    return <div>
        Track
        <Container>
            <img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Shopping_cart_of_Prisma_shop.JPG/640px-Shopping_cart_of_Prisma_shop.JPG"}/>
            <PlayCircleIcon/>
            <div>author</div>
            <div>name audio</div>

        </Container>
    </div>
}

export default PopularTrack;