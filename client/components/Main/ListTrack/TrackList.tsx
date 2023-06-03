import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ITrack } from "types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
    tracks: ITrack[],
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    const [displayedTracks, setDisplayedTracks] = useState<ITrack[]>([]);

    useEffect(() => {
        setDisplayedTracks(tracks);
      }, [tracks]);

    return (
        <Grid container direction="column">
            <Box p={2}>
            {displayedTracks.map((track,index) =>
                    <TrackItem
                        key={index}
                        track={track}
                    />
                )}            
            </Box>
        </Grid>
    );
};

export default TrackList;