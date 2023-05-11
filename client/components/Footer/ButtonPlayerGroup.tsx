import React from "react"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {IconButton} from "@mui/material";
import {Pause, PlayArrow} from "@mui/icons-material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReplayIcon from "@mui/icons-material/Replay";
import LoopIcon from "@mui/icons-material/Loop";

const ButtonPlayerGroup = ({play, pause,previous,next}) => {

    const iconPlayer = [0,1,2,3,4];

    const paintIconPlayer = (numbers: number) => {
        switch (numbers.toString()) {
            case '0':
                return <LoopIcon/>
            case '1':
                return <SkipPreviousIcon onClick={previous}/>
            case '2':
                if(pause){
                    return <PlayArrow onClick={play}/>
                }
                else return <Pause onClick={play}/>
            case '3':
                return <SkipNextIcon onClick={next}/>
            case '4':
                return <ReplayIcon/>
        }
    }

    return <div>
        {
            iconPlayer.map(({},index)=> <IconButton>{paintIconPlayer(index)}</IconButton>)
        }
    </div>
}

export default ButtonPlayerGroup;