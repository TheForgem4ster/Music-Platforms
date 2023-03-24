import React from "react";
import Slider from "@mui/material/Slider";

const ScrollBar = ({position, duration, onChangeSetPosition, theme}) => {
      
        React.useEffect(() => {
            if(!isMouseDown)
         setValue(position);
        }, [position]);

        const [value, setValue] = React.useState<number>(position);
        const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
        const handleChange = (event: Event, newValue: number | number[]) => {
            setValue(newValue as number);
            setIsMouseDown(true)
          };
          const handleChangeCommitted = (event: Event | React.SyntheticEvent<Element, Event>,newValue: number | number[] ) => {
            onChangeSetPosition(event as Event,newValue as number)
            setIsMouseDown(false)
          };    
    return(
        <Slider
            aria-label="time-indicator"
            size="small"
            value={value}
            min={0}
            step={1}
            max={duration}
            onChangeCommitted={handleChangeCommitted}
            onChange={handleChange}
            sx={{
                color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                height: 4,
                '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                    transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                    '&:before': {
                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                    },
                    '&:hover, &.Mui-focusVisible': {
                        boxShadow: `0px 0px 0px 8px ${
                            theme.palette.mode === 'dark'
                                ? 'rgb(255 255 255 / 16%)'
                                : 'rgb(0 0 0 / 16%)'
                        }`,
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
    )
}

export default ScrollBar;