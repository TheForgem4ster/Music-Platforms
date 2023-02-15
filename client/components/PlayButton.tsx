import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { Children } from "react";
import {useActions} from "../hooks/useActions";
import {ITrack} from "../types/track";
import {useTypedSelector} from "../hooks/useTypedSelector";



const PlayButton=({track})=>{
    const {setActiveTrack} = useActions()
    const {id} = useTypedSelector(state => state.player)
    const check = () => {
        if(track._id!==id){
          setActiveTrack(track)
        }
    }
    const global =()=>{
        check();

    }
    return(
        <IconButton onClick={check}  >
              
        </IconButton>
    )
}
export default PlayButton;