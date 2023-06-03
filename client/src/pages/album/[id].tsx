import MainLayouts from "layouts/MainLayouts";
import React, {useEffect, useState} from "react";
import { IconButton } from "@mui/material";
import TrackList from "../../../components/Main/ListTrack/TrackList";
import {ITrack} from "../../../types/track";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {IAlbum} from "../../../types/album";
import { PlayArrow } from "@mui/icons-material";
import {GetServerSideProps} from "next";
import SearchString from "components/SearchString";
import {NextThunkDispatch, wrapper} from "store";
import {fetchTracksByAlbum} from "store/action-creators/track";
import {  getSpecificAlbum } from "store/action-creators/album";


interface TrackItemProps {
    serverAlbum: IAlbum;
    serverTracks:ITrack[]
}

const AlbumId: React.FC<TrackItemProps> = ({serverAlbum,serverTracks}) => {
    const [album, setAlbum] = useState<IAlbum[]>(serverAlbum);
    const {tracks, error} = useTypedSelector(state => state.track)
    const [searchQuery, setSearchQuery] = useState("")
    const [filteredTracks, setFilteredTracks] = useState<ITrack[]>([]);

    useEffect(() => {
        setFilteredTracks(tracks);
      }, [tracks]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        setTimeout(() => {
          const filtered = tracks.filter((track) =>
            track.name.toLowerCase().includes(query.toLowerCase())
          );
          setFilteredTracks(filtered);
        }, 600); 
    
      };
    

      const dataConversion = (originalDate: string) => {
        const date = new Date(originalDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
    const imageUrl = album[0].picture;
    
    const defaultImageUrl = 'https://24tv.ua/resources/photos/news/202204/1961563.jpg?v=1661254059000';
    return (
        <MainLayouts title={"list album - music platform"}>
        <div style={{display: "flex"}}>
            <img src={imageUrl}
                 onError={(e) => {
                     e.target.src = defaultImageUrl;
                 }}
                 alt="Photo album"
                 style={{width: 220, height: 170, borderRadius: 20,}}/>

            <div style={{justifyItems: "center", alignItems: "center", flex: 1}}>
                <h1 style={{textAlign: "center"}}>Name album: {album[0].name}</h1>

                <h4 style={{marginLeft: 30}}>Create by: {dataConversion(album[0].dateCreate)}</h4>

                <h4 style={{marginLeft: 30}}>Like count: {album[0].likeCount}</h4>

                <IconButton style={{height: 50, width: 150, borderRadius: 30, textAlign: "center", flex: 1}}>
                    <PlayArrow style={{fontSize: 40, color: "#D6D8FF"}}/>
                </IconButton>

            </div>
        </div>
        <div style={{marginTop: 40}}>
           
            <SearchString
                flag={false}
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={"Search albums..."}
                widthCursor={"45em"}
            />
            <TrackList tracks={filteredTracks}/>
        </div>
    </MainLayouts>
    )
}
// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//     const response = await axios.get('http://localhost:5000/album/index/' + params.id)
//     return {
//         props: {
//             serverAlbum: response.data
//         }
//     }
// }
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
    (store) => async ({params}) => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(getSpecificAlbum(params.id));
      await dispatch(fetchTracksByAlbum(params.id));
     
      const { track } = store.getState();
      const { album } = store.getState();
      console.log("!!!"+JSON.stringify(album))
      console.log("!!!"+JSON.stringify(track))
      return {
        props: {
          serverAlbum: album.albums, 
          serverTracks: track.tracks
        },
      };
    }
  );


export default AlbumId;