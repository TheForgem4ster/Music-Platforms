import React from "react";
import { ITrack } from "types/track";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {

    return (
        <>
            {track.name}
        </>
    )
}

export default TrackItem;