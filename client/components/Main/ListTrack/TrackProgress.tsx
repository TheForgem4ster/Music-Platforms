import { Slider } from "@mui/material";
import { Box } from "@mui/system";
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
      <Box sx={{width: 100, display:"flex" }}>
        <Slider
            aria-label="time-indicator"
            size="small"
            value={left}
            min={0}
            step={1}
            max={right}
            onChange={onChange}
            sx={{
                // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                height: 4,
                '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                        // boxShadow: `0px 0px 0px 8px ${
                        //     theme.palette.mode === 'dark'
                        //         ? 'rgb(255 255 255 / 16%)'
                        //         : 'rgb(0 0 0 / 16%)'
                        // }`,
                    },
                    '&.Mui-active': {
                        width: 15,
                        height: 15,
                    },
                },
                '& .MuiSlider-rail': {
                    opacity: 0.28,
                },
            }}
        />
        </Box>
    );
};

export default TrackProgress;