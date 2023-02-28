import { Slider } from "@mui/material";
import React from "react";

interface TrackProgressProps {
    left: number;
    right: number;
    leftIcon?:number;
    rightIcon?:number;
    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> =
({
     left, right,leftIcon,rightIcon, onChange
 }) => {
    return (
        <div style={{display: 'flex'}}>
            <div>{leftIcon}</div>
            {/*<Slider*/}

                <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{rightIcon}</div>
        </div>
    );
};

export default TrackProgress;