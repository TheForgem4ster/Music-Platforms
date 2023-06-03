import React from "react"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {IconButton} from "@mui/material";
import {Pause, PlayArrow} from "@mui/icons-material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ReplayIcon from "@mui/icons-material/Replay";
import LoopIcon from "@mui/icons-material/Loop";
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';

const ButtonPlayerGroup = ({play, pause,previous,next,repeat,shuffle,repeatCount}) => {

    const [activeShuffle, setActiveShuffle] = React.useState(true);

    const toggleShuffle = () => {
        setActiveShuffle((prevActiveShuffle) => !prevActiveShuffle);
        shuffle()
    };

    const iconPlayer = [0,1,2,3,4];

    const paintIconPlayer = (numbers: number) => {
        switch (numbers.toString()) {
            // case '0':
            //     return <LoopIcon onClick={shuffle}/>
            case '0':
                return activeShuffle ? (<LoopIcon />) : (<LoopIcon style={{color: "#08C76E"}}/>)
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
                switch (repeatCount) {
                    case 0:
                        return <RepeatIcon onClick={repeat}/>

                    case 1:
                        return <RepeatOneIcon onClick={repeat}/>

                    case 2:
                        return <RepeatIcon style={{color: "#08C76E"}} onClick={repeat}/>
                }
        }
    }

    return  <div>
        <IconButton onClick={toggleShuffle}>
            {paintIconPlayer(0)}
        </IconButton>
        {iconPlayer.slice(1).map(({}, index) => (
            <IconButton key={index + 1}>{paintIconPlayer(index + 1)}</IconButton>
        ))}
    </div>
}

export default ButtonPlayerGroup;